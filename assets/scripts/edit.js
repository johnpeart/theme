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

// TEMPLATES
var aboutTemplate = `---
type: "Type"
title: "Role title"
organisation: "Organisation"
dates:
  start: ` + now + `
  end: ` + now + `
permalink: /about/role-title
---`

var blogpostTemplate = `---
date: ` + now + ` 09:00:00 +0000
title: "Blogpost title"
excerpt: "Excerpt"
image: /posts/YYYY/MM/DD/post-slug/image-name.jpg
categories:
- category
---`

var ideasTemplate = `---
type: "Type"
title: "Idea"
link: "//example.com"
hidden: false
---`

var listTemplate = `---
date: ` + now + ` 09:00:00 +0000
title: "List template"
list:
- status: "done"
  todo: "Completed task"
- status: "not done"
  todo: "Incomplete task"
---`

var manualsTemplate = `---
title: LCARS clock
excerpt: "Excerpt"
category:
- category
---`

var musicTemplate = `---
date: ` + now + ` 09:00:00 +0000
title: "Title"
artist: "Artist"
rating: 5
artwork: "//example.com"
image: "//example.com"
---`

var noteTemplate = `---
date: ` + now + ` 09:00:00 +0000
title: "Title"
excerpt: "Excerpt"
colour: "yellow"
---`

var nowTemplate = `---
date: ` + now + ` 09:00:00 +0000
title: "Month 20XX"
excerpt: "Excerpt"
image: /site/social-media-now.png
---`

var replyTemplate = `---
date: ` + now + ` 09:00:00 +0000
reply_to:
  author:
	name: "Original author"
	url: "//example.com"
  post:
	url: "//example.com/post-title"
    date: ` + now + ` 09:00:00 +0000
	content: |
	  What did they say
  original:
	url: "/2024/01/01/original-post"
	title: "Making “Webmentions” look more conversational"
---
My reply`

var shareTemplate = `---
date: ` + now + ` 09:00:00 +0000
reply_to:
  author:
	name: "Original author"
	url: "//example.com"
  publication:
	name: "Website"
	url: "//example.com/"
  post:
	title: "Post title"
	url: "//example.com"
	image: "//example.com/image.jpg"
	date: ` + now + ` 09:00:00 +0000
	content: |
	  Quoted content
image: "//example.com/image.jpg"
---`

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

// goHome()
// Redirects to the home page.
function goHome() {
	var pageURL = window.location.href;
	if (pageURL.includes("localhost")) {
		window.location.href = "//localhost:4000";	
	} else {
		window.location.href = "//www.johnpe.art";
	}
	
}
homeButton.addEventListener('click', function () {
	goHome();
});

// githubNewFile()
// Erases the contents of the 'textEditor' textarea, so you can start from scratch.
// If a folder is selected, creates a relevant template.
function githubNewFile() {
	var folderPath = document.getElementById('folderName').innerText;
	
	// Form fields
	if (folderPath == "/_about") {
		document.getElementById('fileName').value = now + '-role-title.md';
		document.getElementById('textEditor').value = aboutTemplate;
	} else if (folderPath == "/_blogpost") {
		document.getElementById('fileName').value = now + '-blogpost-title.md';
		document.getElementById('textEditor').value = blogpostTemplate;
	} else if (folderPath == "/_ideas") {
		document.getElementById('fileName').value = 'ideas-title.md';
		document.getElementById('textEditor').value = ideasTemplate;
	} else if (folderPath == "/_list") {
		document.getElementById('fileName').value = now + '-list-title.md';
		document.getElementById('textEditor').value = listTemplate;
	} else if (folderPath == "/_manuals") {
		document.getElementById('fileName').value = now + '-manual-title.md';
		document.getElementById('textEditor').value = manualsTemplate;
	} else if (folderPath == "/_music") {
		document.getElementById('fileName').value = now + '-music-title.md';
		document.getElementById('textEditor').value = musicTemplate;
	} else if (folderPath == "/_note") {
		document.getElementById('fileName').value = now + '-note-title.md';
		document.getElementById('textEditor').value = noteTemplate;
	} else if (folderPath == "/_now") {
		document.getElementById('fileName').value = now + '-now.md';
		document.getElementById('textEditor').value = nowTemplate;
	} else if (folderPath == "/_reply") {
		document.getElementById('fileName').value = now + '-001.md';
		document.getElementById('textEditor').value = replyTemplate;
	} else if (folderPath == "/_share") {
		document.getElementById('fileName').value = now + '-share-title.md';
		document.getElementById('textEditor').value = shareTemplate;
	} else {
		document.getElementById('fileName').value = '';
		document.getElementById('textEditor').value = '';
	}
	
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


// Function to download a file using content of the active session
function downloadFile() {
	// Form fields
	var fileName = document.getElementById('fileName').value.trim();
	var fileContent = document.getElementById('textEditor').value.trim();
	
	// create a new Blob object with the text data and the appropriate mime-type
	const blob = new Blob([fileContent], { type: 'plain/text' });
	
	// create a DOMString containing a URL representing the Blob object
	const url = URL.createObjectURL(blob);
	
	// create a temporary anchor element
	const anchor = document.createElement('a');
	anchor.setAttribute('href', url);
	anchor.setAttribute('download', fileName); // set the file name
	anchor.style.display = 'none';
	
	// add the new anchor to the DOM and trigger a click event
	document.body.appendChild(anchor);
	anchor.click();
	
	// finally remove the anchor from the DOM
	document.body.removeChild(anchor);

}

downloadButton.addEventListener('click', function () {
	downloadFile();
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
			var foldersList = '<li class="dropdown-item"><button id="" class="button--dropdown-menu-item" disabled>Folders</button></li>'

			if (path != '') {
				foldersList += '<li class="dropdown-item"><button id="" class="button--dropdown-menu-item" onclick="githubGetFilesFolders(\'/Home\', \'\')">Home</button></li>';
			}
			contents.forEach(function (item) {
				if (item.type === 'dir') {
					foldersList += '<li class="dropdown-item"><button type="button" class="button--dropdown-menu-item" onclick="githubGetFilesFolders(\'' + item.name + '\', \'' + item.path + '\')">' + item.name + '</button></li>'
				}
			});

			// Create a list of file names
			var filesList = '<li class="dropdown-item"><button id="" class="button--dropdown-menu-item" disabled>Files</button></li>';
			contents.forEach(function (item) {
				if (item.type === 'file') {
					filesList += '<li class="dropdown-item"><button type="button" class="button--dropdown-menu-item" onclick="githubOpenFile(\'' + item.name + '\', \'' + item.path + '\'); closeDetails(\'editor-toolbar--folder\')">' + item.name + '</button></li>'
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
