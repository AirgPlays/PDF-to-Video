chrome.action.onClicked.addListener((tab) => {
  const pdfUrl = tab.url;
  const mp4Url = pdfUrl.replace(/\.pdf$/i, '.mp4');
  const finalUrl = (mp4Url !== pdfUrl) ? mp4Url : pdfUrl + '.mp4'; // fallback: append .mp4

  const playerUrl = chrome.runtime.getURL("player.html") + "?url=" + encodeURIComponent(finalUrl);
  chrome.tabs.create({ url: playerUrl });
});