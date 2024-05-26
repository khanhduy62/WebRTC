import * as store from './store.js';
import * as wss from './wss.js';
import * as webRTCHandler from './webRTCHandler.js';
import * as constants from './constants.js';

// initialization of socketIO connection
const socket = io('/');
wss.registerSocketEvents(socket);
webRTCHandler.getLocalPreview();

//register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
  'personal_code_copy_button'
);
personalCodeCopyButton.addEventListener('click', () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});


const personalCodeVideoButton = document.getElementById(
  'personal_code_video_button'
);


personalCodeVideoButton.addEventListener('click', () => {
  console.log('video button clicked');

  const calleePersonalCode = document.getElementById(
    'personal_code_input'
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
