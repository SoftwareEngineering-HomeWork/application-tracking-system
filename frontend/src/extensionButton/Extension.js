import React from 'react';
import './Extension.css'

const EnableExtensionButton = () => {

    const TARGET_EXTENSION_ID = 'dfclbknkdgpjcjbndahofgappjijkgdo';

    const handleEnableExtension = async() => {
        localStorage.setItem('chrome-extension',[localStorage.getItem('userId'),localStorage.getItem('token')]);
        // Send a message to the Chrome extension
        // if (!chrome || !chrome.runtime) {
        //     alert('Chrome APIs are not available in this web page');
        //     return;
        //   }
        
        //   try {
        //     const response = await new Promise((resolve, reject) => {
        //       chrome.runtime.sendMessage(
        //         TARGET_EXTENSION_ID,
        //         { type: 'GET_DATA', payload: {} },
        //         (response) => {
        //           if (chrome.runtime.lastError) {
        //             reject(chrome.runtime.lastError);
        //           } else {
        //             resolve(response);
        //           }
        //         }
        //       );
        //     });

        //     console.log('Received response from extension:', response);
        //     alert("Extension enabled");
        //   }
          
        //   catch (error) {
        //     console.error('Failed to send message:', error);
        //     alert("Failed to enable the extension");
        //   }
    };

    return (
        <button id="enable-extension" className="styled-button" onClick={handleEnableExtension}>
            Enable Chrome Extension
        </button>
    );
};

export default EnableExtensionButton;