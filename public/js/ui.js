import * as constants from './constants.js';
import * as elements from './elements.js';

export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    'personal_code_paragraph'
  );
  personalCodeParagraph.innerHTML = personalCode;
};

export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById('local_video');
  localVideo.srcObject = stream;

  localVideo.addEventListener('loadedmetadata', () => {
    localVideo.play();
  });
};

export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? 'Chat' : 'Video';

  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById('dialog');
  dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());

  dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById('dialog');
  dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());

  dialog.appendChild(callingDialog);
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDialog = elements.getInfoDialog(
      'Call rejected',
      'Callee rejected your call'
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDialog = elements.getInfoDialog(
      'Callee not found',
      'Please check personal code'
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    infoDialog = elements.getInfoDialog(
      'Call is not possible',
      'Probably callee is busy. Please try againg later'
    );
  }

  if (infoDialog) {
    const dialog = document.getElementById('dialog');
    dialog.appendChild(infoDialog);

    setTimeout(() => {
      removeAllDialogs();
    }, [3000]);
  }
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById('dialog');
  dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());
};

export const showCallElements = (callType) => {
  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    showVideoCallElements();
  }
};


const showVideoCallElements = () => {
  const callButtons = document.getElementById('call_buttons');
  showElement(callButtons);

  const placeholder = document.getElementById('video_placeholder');
  hideElement(placeholder);

  const remoteVideo = document.getElementById('remote_video');
  showElement(remoteVideo);

};

const hideElement = (element) => {
  if (!element.classList.contains('display_none')) {
    element.classList.add('display_none');
  }
};

const showElement = (element) => {
  console.log('log--element ', element)
  if (element?.classList?.contains('display_none')) {
    element.classList.remove('display_none');
  }
};
