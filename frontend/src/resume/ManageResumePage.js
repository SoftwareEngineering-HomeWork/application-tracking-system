import React, { Component } from 'react'
import $ from 'jquery'
import '../static/resume.css'


export default class ManageResumePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileName: '',           // To display the name of the uploaded file
      fileuploadname: '',     // To hold the selected file name (before uploading)
      resumeDownloadContent: null, // To hold the file content when downloaded
    }
  }

  // Fetch the file name from the backend (e.g., after the component mounts)
  componentDidMount () {
    this.getFiles();  // This will check if a resume is uploaded for the user
  }

  getFiles () {
    const userId = localStorage.getItem('userId');
    $.ajax({
      url: 'http://127.0.0.1:5001/resume', // Adjusted to match the route in your backend
      method: 'GET',
      headers: {
        userid: userId,
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Token authentication
      },
      success: (response) => {
        this.setState({ fileName: response.fileName || 'No resume uploaded' });  // Display the file name if available
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Handle the change in file input
  handleChange(event) {
    var name = event.target.files[0].name;
    console.log(`Selected file - ${name}`);
    this.setState({ fileuploadname: name });  // Set the file name
  }

  // Handle the upload of a resume
  uploadResume() {
    const formData = new FormData();
    const fileInput = document.getElementById('file').files[0];  // Get the file from input
    const userId = localStorage.getItem('userId');
    formData.append('file', fileInput);  // Append the file to form data

    $.ajax({
      url: 'http://127.0.0.1:5001/resume/upload',  // Backend route to handle file upload
      method: 'POST',
      headers: {
        userid: userId,
        'Authorization': 'Bearer ' + localStorage.getItem('token'),  // Authentication
      },
      data: formData,
      contentType: false,  // Not setting contentType, because it's a multipart form
      processData: false,  // Don't process the data
      success: () => {
        this.getFiles();  // Refresh the file name after upload
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Handle downloading of resume
  downloadResume() {
    const userId = localStorage.getItem('userId');
    $.ajax({
      url: 'http://127.0.0.1:5001/resume/download',  // Backend route to handle file download
      method: 'GET',
      headers: {
        userid: userId,
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      xhrFields: {
        responseType: 'blob',  // Expect the response to be a binary (PDF)
      },
      success: (response) => {
        var a = document.createElement('a'); // Create an anchor element for downloading
        var url = window.URL.createObjectURL(response); // Create a URL for the blob
        a.href = url;
        a.download = 'resume.pdf'; // Set the name of the downloaded file
        document.body.appendChild(a);
        a.click();  // Simulate a click on the anchor to trigger download
        a.remove();  // Remove the anchor element after downloading
        window.URL.revokeObjectURL(url);  // Clean up the URL object
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    return (
      <form className="pagelayout" id="upload-file" method="post" encType="multipart/form-data">
        <input
          id="file"
          name="file"
          type="file"
          onChange={this.handleChange.bind(this)} // Handle file change
        />
        <button
          id="upload-file-btn"
          onClick={this.uploadResume.bind(this)}  // Handle upload button click
          type="button"
        >
          Upload
        </button>

        <div style={{ margin: '2em' }}></div>

        <div>
          <h2>Uploaded Documents</h2>
          <table>
            <thead>
              <tr>
                <th className="tablecol1">Documents</th>
                <th className="tablecol2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tablecol1">{this.state.fileName}</td> {/* Display file name */}
                <td className="tablecol2">
                  <button
                    id="download"
                    onClick={this.downloadResume.bind(this)}  // Handle download button click
                    type="button"
                    disabled={!this.state.fileName}  // Disable if no file is uploaded
                  >
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}
