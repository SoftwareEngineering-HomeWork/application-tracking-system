
function continuousfn()
{
//The userID will be stored here
  let userID="";
  let token="";

  console.log("Hello from content script");

  //Looping through the localstorage to find the database names
  Object.keys(localStorage).forEach(function (key) {
    if (key.includes("chrome-extension")) {
      let temp=localStorage.getItem('chrome-extension').split(",")
      userID=temp[0];
      token=temp[1];
    }
  });

  if(userID=="") userID="delete"

  console.log('This is the user id',userID)
  console.log('This is token',token)

  if(userID.length==0)
  {
    console.log("Whattt")
    (async () => {
      const response = await chrome.runtime.sendMessage(["delete"]);
      console.log(response);
    })();
  }


  //We pass the userID to the background worker
  if(userID.length!=0)
  {
    //We call an IIFE
    (async () => {
      const response = await chrome.runtime.sendMessage([userID,token]);
    })();
  }
}

continuousfn();

