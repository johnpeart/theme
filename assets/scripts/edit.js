---

---

// DEFAULTS
const repositoryOwner = '{{ site.github.username }}';
const repositoryName = '{{ site.github.repo }}';
const branchName = '{{ site.github.branch }}';

var currentdate = new Date(); 
var now = currentdate.toISOString().slice(0,10); // "2014-05-12"
				

// BUTTONS
const loginButton = document.getElementById('loginButton')
const deleteButton = document.getElementById('deleteButton')
const listButton = document.getElementById('listButton')
const clearButton = document.getElementById('clearButton')
const openFileButton = document.getElementById('openFileButton')
const closeFilesButton = document.getElementById('closeFilesButton')
const newFileButton = document.getElementById('newFileButton')



// SET UP
if (sessionStorage.getItem('username') == null || sessionStorage.getItem('token') == null) {
	console.warn('No username or token set');
	hideElement('editor-toolbar');
	hideElement('section-githubFileContent');
	showElement('section-githubLogin');
} else {			
	githubGetFilesFolders('','');
}



// HELPERS 

function openModal(nameOfModal) {
	var d = document.getElementById(nameOfModal);
	d.showModal();
}

function closeModal(nameOfModal) {
	var d = document.getElementById(nameOfModal);
	d.close();
}

function hideElement(nameOfElement) {
	var el = document.getElementById(nameOfElement);
	el.classList.add('hidden');
}

function showElement(nameOfElement) {
	var el = document.getElementById(nameOfElement);
	el.classList.remove('hidden');
}

function closeDetails(nameOfDetails) {
	var d = document.getElementById(nameOfDetails);
	d.open = false;
}

function focusElement(nameOfElement) {
	var el = document.getElementById(nameOfElement);
	el.focus();
}




// SETTINGS

// githubLogin()
// This screen sets sessionStorage variables 'username' and 'token'.
// When these variables have not been set, the screen will show on load.
function githubLogin() {	
	// Form fields
	var username = document.getElementById('username').value;
	var token = document.getElementById('token').value;
	
	sessionStorage.setItem('username', username);
	sessionStorage.setItem('token', token);
	
	sessionStorage.setItem('repositoryOwner', repositoryOwner);
	sessionStorage.setItem('repositoryName', repositoryName);
	sessionStorage.setItem('branchName', branchName);

	hideElement('section-githubLogin');
	showElement('editor-toolbar');
	showElement('section-githubFileContent');
	focusElement('textEditor');
	
	githubGetFilesFolders(sessionStorage.getItem('fileName'), sessionStorage.getItem('filePath'));
}

loginButton.addEventListener('click', function () {
	githubLogin();
});




// FILE MENU

// githubNewFile()
// Erases the contents of the 'textEditor' textarea, so you can start from scratch.
function githubNewFile() {
	// Form fields
	document.getElementById('textEditor').value = '';
	document.getElementById('fileName').value = '';
	focusElement('textEditor');
	
	closeDetails('editor-toolbar--file');
}

newFileButton.addEventListener('click', function () {
	githubNewFile();
});



// githubSaveFile()
// Function to push a file to GitHub; accessed via the Save File menu.
function githubSaveFile() {
	// Form fields
	var username = sessionStorage.getItem('username');
	var token = sessionStorage.getItem('token');
	var repositoryOwner = sessionStorage.getItem('username');
	var repositoryName = sessionStorage.getItem('repositoryName');
	var branchName = sessionStorage.getItem('branchName');
	var folderPath = document.getElementById('folderName').innerText;
	var fileName = document.getElementById('fileName').value;
	var filePath = folderPath + fileName;
	if (filePath.charAt(0) == '/') {
		var filePath = filePath.substring(1);
	}
	var commitMessage = 'Updated file @ ' + now;
	var fileContent = document.getElementById('textEditor').value;
	
	// Initialize the GitHub API with user credentials
	var github = new GitHub({
		token: token
	});

	// Get the repository
	var repo = github.getRepo(repositoryOwner, repositoryName);

	// Create a file and push it to the repository
	repo.writeFile(
		branchName,
		filePath,
		fileContent,
		commitMessage,
		{},
		function (err) {
			if (err) {
				alert('Saving the file failed: \n' + err.message);
			} else {
				alert('File pushed to GitHub successfully!');
			}
		}
	);
	
	closeDetails('editor-toolbar--file');
}

saveButton.addEventListener('click', function () {
	githubSaveFile();
});

// Function to delete a file from GitHub
function githubDeleteFile() {
	// Form fields
	var username = sessionStorage.getItem('username');
	var token = sessionStorage.getItem('token');
	var repositoryOwner = sessionStorage.getItem('username');
	var repositoryName = sessionStorage.getItem('repositoryName');
	var branchName = sessionStorage.getItem('branchName');
	var folderPath = document.getElementById('folderName').innerText;
	var fileName = document.getElementById('fileName').value;
	var filePath = folderPath + fileName;
	if (filePath.charAt(0) == '/') {
		var filePath = filePath.substring(1);
	}
	
	// Initialize the GitHub API with user credentials
	var github = new GitHub({
		token: token
	});

	// Get the repository
	var repo = github.getRepo(repositoryOwner, repositoryName);

	// Create a file and push it to the repository
	repo.deleteFile(
		branchName,
		filePath,
		function (err) {
			if (err) {
				alert('Deleting the file failed: \n' + err.message);
			} else {
				alert('File deleted');
			}
		}
	);
}

deleteButton.addEventListener('click', function () {
	githubDeleteFile();
});



// FOLDER MENU

// githubGetFilesFolders()
// Enables the user to select a folder from the drop down menu by listing all folders in the repo.
// This is triggered when the page loads.

function githubGetFilesFolders(name, path) {
	
	// Form fields
	var username = sessionStorage.getItem('username');
	var token = sessionStorage.getItem('token');
	
	var fileName = name;
	var filePath = path;
	
	// Initialize the GitHub API with user credentials
	var github = new GitHub({
		token: token
	});
	
	// Get the repository
	var repo = github.getRepo(username, repositoryName);
	
	// Fetch the list of files in the repository
	repo.getContents(
		branchName, 
		filePath,
		false, 
		function (err, contents) {
		if (err) {
			alert('Getting the repository files and folders failed: \n' + err.message);
		} else {
			
			// Create a list of folder names
			var foldersList = '<li><button id="" class="button dropdown-menu--button" disabled>Folders</button></li>'
			
			if (path != '') {
				foldersList += '<li><button id="" class="button dropdown-menu--button" onclick="githubGetFilesFolders(\'/Home\', \'\')">Home</button></li>';
			}
			contents.forEach(function (item) {
				if (item.type === 'dir') {
					foldersList += '<li><button type="button" class="button dropdown-menu--button" onclick="githubGetFilesFolders(\'' + item.name + '\', \'' + item.path + '\')">' + item.name + '</button></li>'
				}
			});
			
			// Create a list of file names
			var filesList = '<li><button id="" class="button dropdown-menu--button" disabled>Files</button></li>';
			contents.forEach(function (item) {
				if (item.type === 'file') {
					filesList += '<li><button type="button" class="button dropdown-menu--button" onclick="githubOpenFile(\'' + item.name + '\', \'' + item.path + '\'); closeDetails(\'editor-toolbar--folder\')">' + item.name + '</button></li>'
				}
			});
			
			if (filePath == null) {
				document.getElementById('folderName').innerHTML = '/';
			} else {
				document.getElementById('folderName').innerHTML = '/' + filePath;
			}
			
			// Display the list of files in the HTML
			document.getElementById('foldersList').innerHTML = foldersList;
			document.getElementById('filesList').innerHTML = filesList;
		}
	});
}

// githubOpenFile()
// Opens a file – places the content in the 'textEditor' textarea.
function githubOpenFile(name, path) {
	// Form fields
	var username = sessionStorage.getItem('username');
	var token = sessionStorage.getItem('token');
	
	var filePath = path;
	var fileName = name;
	var folderPath = filePath.replace(fileName, '');
	console.log('fileName: ' + fileName + '; filePath: ' + filePath + '; folderPath: ' + folderPath);
		
	// Initialize the GitHub API with user credentials
	var github = new GitHub({
		token: token
	});
	
	// Get the repository
	var repo = github.getRepo(username, repositoryName);
	
	// Fetch the list of files in the repository
	repo.getContents(
		branchName, 
		filePath,
		true, 
		function (err, contents) {
		if (err) {
			alert('Opening the file failed \n: ' + err.message);
		} else {			
			var fileContent = contents;
						
			// Update the folder name in the menu bar
			document.getElementById('folderName').innerHTML = '/' + folderPath;
			
			// Put the filename in the text input
			document.getElementById('fileName').value = fileName;
			// Display the content of the file
			document.getElementById('textEditor').value = fileContent;
		}
	});
}


// LOGOUT
function clearLocalStorage() {
	sessionStorage.clear()
	showElement('section-githubLogin');
	hideElement('editor-toolbar');
	hideElement('section-githubFileContent');
	closeDetails('editor-toolbar--account');
}

clearButton.addEventListener('click', function () {
	clearLocalStorage();
});