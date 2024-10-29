function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

//usage:
readTextFile("./asset/json/JSON_Data.txt", function (text) {
  var data = JSON.parse(text);
  console.log(data);
  setData(data);
});

function setData(data) {
  document.getElementById("testing-site-url").innerHTML = data.url;
  document.getElementById("testing-standard").innerHTML = data.standard;
  setTabCount(data.errorCount, data.warningCount, data.noticeCount);
  setResultMeterProgressBar(
    data.errorCount,
    data.warningCount,
    data.noticeCount
  );
  paintErrorList(data);
}

function setGuageMeter() {
  clearGuageMeter();
  let resultCount = 80;

  var guageMeter = document.getElementById("guage-needle");
  if (resultCount <= 25) {
    guageMeter.classList.add("rischio1");
  } else if (resultCount >= 25 && resultCount <= 50) {
    guageMeter.classList.add("rischio2");
  } else if (resultCount >= 50 && resultCount <= 75) {
    guageMeter.classList.add("rischio3");
  } else if (resultCount >= 75 && resultCount <= 100) {
    guageMeter.classList.add("rischio4");
  }
}

function clearGuageMeter() {
  var guageMeter = document.getElementById("guage-needle");
  guageMeter.classList.remove("rischio1");
  guageMeter.classList.remove("rischio2");
  guageMeter.classList.remove("rischio3");
  guageMeter.classList.remove("rischio4");
}

function setResultMeterProgressBar(errorCount, warningCount, noticesCount) {
  let errorPer =
    (errorCount / (errorCount + warningCount + noticesCount)) * 100;
  let warniongPer =
    (warningCount / (errorCount + warningCount + noticesCount)) * 100;
  let noticesPer =
    (noticesCount / (errorCount + warningCount + noticesCount)) * 100;

  let errorBar = document.getElementById("error-bar");
  errorBar.innerHTML = parseInt(errorPer) + "%";
  errorBar.style.width = errorPer + "%";
  document.getElementById("progressbar-error-count").innerHTML = errorCount;

  let warningBar = document.getElementById("warning-bar");
  warningBar.innerHTML = parseInt(warniongPer) + "%";
  warningBar.style.width = warniongPer + "%";
  document.getElementById("progressbar-warning-count").innerHTML = warningCount;

  let noticesBar = document.getElementById("notices-bar");
  noticesBar.innerHTML = parseInt(noticesPer) + "%";
  noticesBar.style.width = noticesPer + "%";
  document.getElementById("progressbar-notices-count").innerHTML = noticesCount;
}

function setTabCount(errorCount, warningCount, noticesCount) {
  document.getElementById("error-tab-count").innerHTML = "(" + errorCount + ")";
  document.getElementById("warning-tab-count").innerHTML =
    "(" + warningCount + ")";
  document.getElementById("notices-tab-count").innerHTML =
    "(" + noticesCount + ")";
}

function paintErrorList(data) {
  let errors = data.Errors;
  let htmlElement = "";
  for (let i = 0; i < errors.length; i++) {
    let error = errors[i];
    let issuesCode = error.issueCodes;
    // console.log(issuesCode);
    let headingId = "heading-" + i;
    let dataBsTarget = "errorTag-Collapse-" + i;
    let ariaControls = "errorTag-Collapse-" + i;
    let errorTagCollapse = "errorTag-Collapse-" + i;
    let arialLabelledBy = "heading-" + i;
    htmlElement =
      htmlElement +
      '<div class="accordion-item"><h2 class="accordion-header" id="' +
      headingId +
      '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' +
      dataBsTarget +
      '" aria-expanded="true" aria-controls="' +
      ariaControls +
      '"><strong>tag ' +
      (i + 1) +
      " : &nbsp</strong>" +
      errors[i].issueTag +
      '</button></h2><div id="' +
      errorTagCollapse +
      '" class="accordion-collapse collapse" aria-labelledby="' +
      arialLabelledBy +
      '" data-bs-parent="#errorTagAccordion"> ' +
      paintIssuesCode(issuesCode, i) +
      " </div></div>";
  }
  document.getElementById("errorTagAccordion").innerHTML = htmlElement;
}

function paintIssuesCode(issuesCode, errorTagCollapse) {
  let htmlData = "";
  for (let i = 0; i < issuesCode.length; i++) {
    let headingId = "heading-" + i;
    let dataBsTarget = "errorGuidline-Collapse-" + i;
    let ariaControls = "errorGuidline-Collapse-" + i;
    let errorGuidlineCollapse = "errorGuidline-Collapse-" + i;
    let arialLabelledBy = "heading-" + i;
    let issueCode = issuesCode[i].issueCode;
    let issueDetails = issuesCode[i].issueDetails;
    // console.log(issueDetails);
    htmlData =
      htmlData +
      '<div class="accordion-body"><div class="accordion" id="errorGuidlineAccordion"><div class="accordion-item"><h2 class="accordion-header" id="' +
      headingId +
      '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' +
      dataBsTarget +
      '" aria-expanded="true" aria-controls="' +
      ariaControls +
      '"> <strong>Guidlines ' +
      (i + 1) +
      ": &nbsp</strong> " +
      issueCode +
      '</button></h2><div id="' +
      errorGuidlineCollapse +
      '" class="accordion-collapse collapse" aria-labelledby="' +
      arialLabelledBy +
      '" data-bs-parent="#errorGuidlineAccordion"> ' +
      paintGuidlineMessage(issueDetails) +
      " </div></div></div></div>";
  }
  return htmlData;
}

function paintGuidlineMessage(issueDetails) {
  let htmlData = "";
  for (let i = 0; i < issueDetails.length; i++) {
    let headingId = "heading-" + i;
    let dataBsTarget = "errorGuidlineMessage-Collapse-" + i;
    let ariaControls = "errorGuidlineMessage-Collapse-" + i;
    let errorGuidlineMessageCollapse = "errorGuidlineMessage-Collapse-" + i;
    let arialLabelledBy = "heading-" + i;
    let issueMsg = issueDetails[i].issueMsg;
    // console.log(issueMsg);
    let issueElements = issueDetails[i].issueElements;
    htmlData =
      htmlData +
      '<div class="accordion-body"><div class="accordion" id="errorGuidlineMessage-Collapse"><div class="accordion-item"><h2 class="accordion-header" id="' +
      headingId +
      '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' +
      dataBsTarget +
      '" aria-expanded="true" aria-controls="' +
      ariaControls +
      '"> <strong>Guidline message: &nbsp</strong> ' +
      issueMsg +
      '</button></h2><div id="' +
      errorGuidlineMessageCollapse +
      '" class="accordion-collapse collapse"aria-labelledby="' +
      arialLabelledBy +
      '"data-bs-parent="#errorGuidlineMessage-Collapse">' +
      paintElements(issueElements) +
      "</div></div></div></div>";
  }
  return htmlData;
}

function paintElements(issueElements) {
  // console.log(issueElements);
  let htmlData = "";
  for (let i = 0; i < issueElements.length; i++) {
    console.log(issueElements[i]);
    let element = issueElements[i].element;
    let location = issueElements[i].location;
    let screenShot = issueElements[i].screenShot;
    let elementId = "element-" + i;
    let elementScreenShotId = "element-screenshot-" + i;
    htmlData =
      htmlData +
      '<div class="accordion-body"><div class="list-group list-group-numbered"><div class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold" id="' +
      elementId +
      '"><strong>Element: ' +
      (i + 1) +
      '</strong></div></div><span class="badge bg-primary" id="' +
      elementScreenShotId +
      '">' +
      screenShot +
      "</span></div></div></div>";
  }
  return htmlData;
}
