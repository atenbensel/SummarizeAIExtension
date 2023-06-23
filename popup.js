document.addEventListener('DOMContentLoaded', function() {
  var summarizeButton = document.getElementById('summarize-button');
  var inputText = document.getElementById('input-text');
  var summaryOutput = document.getElementById('summary-output');

  summarizeButton.addEventListener('click', function() {
    var text = inputText.value;
    if (text) {
      summarizeText(text, function(summary) {
        summaryOutput.textContent = summary;
      });
    }
  });

  function summarizeText(text, callback) {
    var apiKey = '5bf5c3c787msh19bb073ca0d9a03p1007e8jsna75ba59b2423';
    var apiHost = 'text-summarizer1.p.rapidapi.com';
    var apiUrl = 'https://' + apiHost;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        if (this.status === 200) {
          var response = JSON.parse(this.responseText);
          var summary = response.summary;
          callback(summary);
        } else {
          console.error('Error:', this.statusText);
        }
      }
    });

    xhr.open('POST', apiUrl + '/summarizer');
    xhr.setRequestHeader('X-RapidAPI-Key', apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.send(JSON.stringify({ text: text }));
  }
});
