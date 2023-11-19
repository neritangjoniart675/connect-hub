/* 
  filename: sophisticated_program.js
  content: This code is a sophisticated program for a digital diary application. 
  It allows users to create, edit, and delete entries in their digital diary. 
  The program includes features like authentication, encryption, and date validation.
*/

// Import necessary modules and libraries
const readline = require('readline');
const fs = require('fs');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Class definition for DiaryEntry
class DiaryEntry {
  constructor(title, content, date) {
    this.title = title;
    this.content = content;
    this.date = date;
  }
}

// Function to encrypt a given string using AES
function encryptString(data, secretKey) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

// Function to decrypt an encrypted string using AES
function decryptString(encryptedData, secretKey) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
}

// Function to validate the format of a given date string
function isValidDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}

// Function to generate a hash for a given password using bcrypt
async function generateHash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Function to compare a given password with a hash using bcrypt
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Function to prompt the user for their username and password
function promptCredentials() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('Username: ', (username) => {
      rl.question('Password: ', (password) => {
        rl.close();
        resolve({ username, password });
      });
    });
  });
}

// Function to authenticate the user
async function authenticate() {
  const storedHash = await fs.promises.readFile('hash.txt', 'utf-8');

  if (!storedHash) {
    console.log('No user exists. Please sign up first.');
    process.exit(0);
  }

  const { username, password } = await promptCredentials();
  const isMatch = await comparePassword(password, storedHash);

  if (isMatch) {
    console.log('Authentication successful!');
    return true;
  } else {
    console.log('Incorrect password. Authentication failed.');
    return false;
  }
}

// Function to sign up a new user
async function signUp() {
  const { username, password } = await promptCredentials();
  const hash = await generateHash(password);

  await fs.promises.writeFile('hash.txt', hash);
  console.log('User signed up successfully!');
}

// Main function to run the digital diary application
async function main() {
  console.log('Welcome to the Digital Diary Application!');

  const isAuthenticated = await authenticate();
  if (!isAuthenticated) {
    return;
  }

  console.log('What would you like to do?');
  console.log('1. Create a new diary entry');
  console.log('2. Edit an existing diary entry');
  console.log('3. Delete a diary entry');
  console.log('4. Exit the application');

  const option = Number.parseInt(await readline.question('Enter your choice: '));

  switch (option) {
    case 1:
      await createEntry();
      break;
    case 2:
      await editEntry();
      break;
    case 3:
      await deleteEntry();
      break;
    case 4:
      console.log('Exiting the application. Goodbye!');
      process.exit(0);
    default:
      console.log('Invalid option. Exiting the application.');
      process.exit(0);
  }
}

// Function to create a new diary entry
async function createEntry() {
  console.log('\n-- Create New Diary Entry --');
  const title = await readline.question('Title: ');
  const content = await readline.question('Content: ');
  const date = await promptValidatedDate();

  const entry = new DiaryEntry(title, content, date);
  const encryptedEntry = encryptString(JSON.stringify(entry), 'mySecretKey');

  await fs.promises.writeFile(`entries/${date}.txt`, encryptedEntry);
  console.log('New diary entry created successfully!');
}

// Function to edit an existing diary entry
async function editEntry() {
  console.log('\n-- Edit Diary Entry --');
  const date = await promptValidatedDate();
  const filePath = `entries/${date}.txt`;

  const encryptedData = await fs.promises.readFile(filePath, 'utf-8');
  const decryptedData = decryptString(encryptedData, 'mySecretKey');
  const entry = JSON.parse(decryptedData);

  console.log('Please provide updated information.');

  const title = await readline.question(`Title (${entry.title}): `) || entry.title;
  const content = await readline.question(`Content (${entry.content}): `) || entry.content;
  const newDate = await promptValidatedDate(entry.date);

  entry.title = title;
  entry.content = content;
  entry.date = newDate;

  const updatedEncryptedEntry = encryptString(JSON.stringify(entry), 'mySecretKey');

  await fs.promises.writeFile(filePath, updatedEncryptedEntry);
  console.log('Diary entry updated successfully!');
}

// Function to delete an existing diary entry
async function deleteEntry() {
  console.log('\n-- Delete Diary Entry --');
  const date = await promptValidatedDate();
  const filePath = `entries/${date}.txt`;

  try {
    await fs.promises.access(filePath);

    const confirmation = await readline.question(`This will delete the diary entry for ${date}. Are you sure? (y/n): `);

    if (confirmation.toLowerCase() === 'y') {
      await fs.promises.unlink(filePath);
      console.log('Diary entry deleted successfully!');
    } else {
      console.log('Deletion cancelled.');
    }
  } catch (error) {
    console.log('Diary entry not found for the given date.');
  }
}

// Function to prompt for a valid date
async function promptValidatedDate(initialDate) {
  let dateInput = '';

  do {
    dateInput = await readline.question('Date (YYYY-MM-DD): ') || initialDate;

    if (!isValidDate(dateInput)) {
      console.log('Invalid date format. Please enter a valid date as YYYY-MM-DD.');
    }
  } while (!isValidDate(dateInput));

  return dateInput;
}

// Run the main function
main().catch(console.error);