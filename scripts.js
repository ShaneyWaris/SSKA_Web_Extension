console.log("scripts running");
var video_id_array = [];
var video_title_array = [];
var video_type_array = [];

let current_label = 0;

var for_dataset = [];
var against_dataset = [];
var neutral_dataset = [];

function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => v === value && count++);
  return count;
}

function Rand(start, end, num, res, arr, op_type) {
  //var count = 0;
  var j = 0;
  while (j < num) {
    var id = Math.floor(Math.random() * end + start);
    if (!res.includes(arr[id])) {
      res.push([arr[id], op_type]);
      j += 1;
    }
  }
  return res;
}

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

var curr_url;
browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  curr_url = tabs[0].url;
  //console.log(curr_url);
});

function open_tab(evt, tabName) {
  var i, tab_body, tablinks;
  tab_body = document.getElementsByClassName("tab-body");
  for (i = 0; i < tab_body.length; i++) {
    tab_body[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function open_link(video_number) {
  browser.tabs.update({
    url: "https://www.youtube.com/watch?v=" + video_id_array[video_number - 1],
  });
}

const Article370 = () => {
  for (let i = 0; i < article_370.length; i++) {
    if (article_370[i].Labels == 1) {
      against_dataset.push(article_370[i]);
    } else if (article_370[i].Labels == 2) {
      for_dataset.push(article_370[i]);
    } else {
      neutral_dataset.push(article_370[i]);
    }
  }

  var out = [];

  // 0 -> Indicates Neutral , 2->  Indicate For Removal , 1 ->  Indicates Against removal
  var flag = false;

  for (let i = 0; i < article_370.length; i++) {
    if (curr_url === article_370[i].Video_Url) {
      console.log("video found");
      flag = true;
      current_label = article_370[i].Labels;

      if (current_label == 0) {
        out = Rand(0, for_dataset.length - 1, 3, out, for_dataset, "for");
        out = Rand(
          0,
          against_dataset.length - 1,
          3,
          out,
          against_dataset,
          "against"
        );
        out = Rand(
          0,
          neutral_dataset.length - 1,
          4,
          out,
          neutral_dataset,
          "neutral"
        );
        //console.log(out);
      }

      if (current_label == 1) {
        out = Rand(0, for_dataset.length - 1, 2, out, for_dataset, "for");
        out = Rand(
          0,
          against_dataset.length - 1,
          3,
          out,
          against_dataset,
          "against"
        );
        out = Rand(
          0,
          neutral_dataset.length - 1,
          5,
          out,
          neutral_dataset,
          "neutral"
        );
        //console.log(out);
      }

      if (current_label == 2) {
        out = Rand(0, for_dataset.length - 1, 3, out, for_dataset, "for");
        out = Rand(
          0,
          against_dataset.length - 1,
          2,
          out,
          against_dataset,
          "against"
        );
        out = Rand(
          0,
          neutral_dataset.length - 1,
          5,
          out,
          neutral_dataset,
          "neutral"
        );
        //console.log(out);
      }
      break;
    }
  }
  if (!flag) {
    console.log("Video not Found");
  }

  //console.log(out);
  for (let i = 0; i < out.length; i++) {
    video_id_array.push(out[i][0].Video_id);
    video_title_array.push(out[i][0].Title);
    video_type_array.push(out[i][1]);
  }

  console.log(video_id_array);
  console.log(video_title_array);
  console.log(video_type_array);

  var f_count = 0;
  var n_count = 0;
  var a_count = 0;

  //for (let i =0 )
  f_count = getOccurrence(video_type_array, "for");
  n_count = getOccurrence(video_type_array, "neutral");
  a_count = getOccurrence(video_type_array, "against");

  var chart_data = [
    ["Against removal", f_count],
    ["Supports removal", a_count],
    ["Neutral", n_count],
  ];
  var alert_message = flag;

  //pie chart using google charts

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Topping");
    data.addColumn("number", "Slices");
    data.addRows(chart_data);
    var options = {
      title: "Statistics For Recommended Videos (SSKA)",
      height: 500,
      width: 550,
      titleTextStyle: {
        color: 'white',    
        bold: true,    
      },
      is3D: true,
      colors: ["purple", "yellow", "green"],
      backgroundColor: "black",
      legend: { textStyle: { color: "white" } },
    };
    var chart = new google.visualization.PieChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }

  // functions

  function toggle(className, displayState){
    var elements = document.getElementsByClassName(className)

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = displayState;
    }
}

  //updating titles, thumbnails, and label colours

  for (let i = 0; i < video_id_array.length; i++) {
    var video_element = "video_" + String(i + 1);

    var video_thumbnail = document.getElementById(video_element + "_thumbnail");
    video_thumbnail.src =
      "http://img.youtube.com/vi/" + video_id_array[i] + "/0.jpg";
    video_thumbnail.height = 100;
    video_thumbnail.width = 150;
    video_thumbnail.classList.add("thumbnail");

    var video_title = video_title_array[i];
    document.getElementById(video_element + "_title").innerHTML = video_title;

    if (video_type_array[i] == "for") {
      document.getElementById(video_element + "_type").style =
        "width:10px;height:100px;background-color:purple;";
    } else if (video_type_array[i] == "against") {
      document.getElementById(video_element + "_type").style =
        "width:10px;height:100px;background-color:yellow;";
    } else if (video_type_array[i] == "neutral") {
      document.getElementById(video_element + "_type").style =
        "width:10px;height:100px;background-color:green;";
    }
  }

  
  if (current_label == 1) {
    var video_type_text='supports removal of Article 370'
    document.getElementById("current_video").innerHTML = "<strong>Hey, </strong> <hr style='border: none;'>you are watching a video that "+video_type_text
  } else if (current_label == 2) {
    var video_type_text='opposes removal of Article 370'
    document.getElementById("current_video").innerHTML = "<strong>Hey, </strong> <hr style='border: none;'> you are watching a video that "+video_type_text
  } else if (current_label == 0) {
    var video_type_text='unbiased video'
      document.getElementById("current_video").innerHTML = "<strong>Hey, </strong> <hr style='border: none;'> you are watching an "+video_type_text
  }

  //checking for alert alert

  if (alert_message) {
    document.getElementById("alert-message").style = "display:block";
  }else{
    toggle('tab-body','none')
    document.getElementById("just-message").style = "display:block";
    document.getElementById('body-container').style.height='220px'
    
  }

  //initiating extension with recommendations tab

  document.getElementById("recommendations-tab").classList.add("active");
  document.getElementById("statistics-body").style.display = "none";
  

};

const us_elections = () => {
  // For Biden , against -trump , Neutral
  for (let i = 0; i < US_elctions.length; i++) {
    if (US_elctions[i].labels == 1) {
      neutral_dataset.push(US_elctions[i]);
    } else if (US_elctions[i].labels == 2) {
      for_dataset.push(US_elctions[i]);
    } else {
      against_dataset.push(US_elctions[i]);
    }
  }

  var out = [];

  // 0 -> Indicates Neutral , 2->  Indicate For Removal , 1 ->  Indicates Against removal
  var flag = false;

  for (let i = 0; i < US_elctions.length; i++) {
    if (curr_url === US_elctions[i].urls) {
      console.log("video found");
      flag = true;
      current_label = US_elctions[i].labels;

      if (current_label == 0) {
        out = Rand(0, for_dataset.length - 1, 3, out, for_dataset, "against");
        out = Rand(
          0,
          against_dataset.length - 1,
          2,
          out,
          against_dataset,
          "for"
        );
        out = Rand(
          0,
          neutral_dataset.length - 1,
          5,
          out,
          neutral_dataset,
          "neutral"
        );
        //console.log(out);
      }

      if (current_label == 1) {
        out = Rand(0, for_dataset.length - 1, 3, out, for_dataset, "for");
        out = Rand(
          0,
          against_dataset.length - 1,
          3,
          out,
          against_dataset,
          "against"
        );
        out = Rand(
          0,
          neutral_dataset.length - 1,
          4,
          out,
          neutral_dataset,
          "neutral"
        );
        //console.log(out);
      }

      if (current_label == 2) {
        out = Rand(0, for_dataset.length - 1, 3, out, for_dataset, "for");
        out = Rand(
          0,
          against_dataset.length - 1,
          2,
          out,
          against_dataset,
          "against"
        );
        out = Rand(
          0,
          neutral_dataset.length - 1,
          5,
          out,
          neutral_dataset,
          "neutral"
        );
        //console.log(out);
      }
      break;
    }
  }
  if (!flag) {
    console.log("Video not Found");
  }

  //console.log(out);
  for (let i = 0; i < out.length; i++) {
    video_id_array.push(out[i][0].ids);
    video_title_array.push(out[i][0].titles);
    video_type_array.push(out[i][1]);
  }

  console.log(video_id_array);
  console.log(video_title_array);
  console.log(video_type_array);

  var f_count = 0;
  var n_count = 0;
  var a_count = 0;

  //for (let i =0 )
  f_count = getOccurrence(video_type_array, "for");
  n_count = getOccurrence(video_type_array, "neutral");
  a_count = getOccurrence(video_type_array, "against");

  var chart_data = [
    ["Democrat", f_count],
    ["Republican", a_count],
    ["Neutral", n_count],
  ];
  var alert_message = flag;

  //pie chart using google charts

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Topping");
    data.addColumn("number", "Slices");
    data.addRows(chart_data);
    var options = {
      title: "Statistics For Recommended Videos (SSKA)",
      height: 500,
      width: 550,
      titleTextStyle: {
        color: 'white',    
        bold: true,    
      },
      is3D: true,
      colors: ["purple", "yellow", "green"],
      backgroundColor: "black",
      legend: { textStyle: { color: "white" } },
    };
    var chart = new google.visualization.PieChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }

  // functions
  function toggle(className, displayState){
    var elements = document.getElementsByClassName(className)

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = displayState;
    }
}
  //updating titles, thumbnails, and label colours

  for (let i = 0; i < video_id_array.length; i++) {
    var video_element = "video_" + String(i + 1);

    var video_thumbnail = document.getElementById(video_element + "_thumbnail");
    video_thumbnail.src =
      "http://img.youtube.com/vi/" + video_id_array[i] + "/0.jpg";
    video_thumbnail.height = 100;
    video_thumbnail.width = 150;
    video_thumbnail.classList.add("thumbnail");

    var video_title = video_title_array[i];
    document.getElementById(video_element + "_title").innerHTML = video_title;

    if (video_type_array[i] == "for") {
      document.getElementById(video_element + "_type").style =
        "width:10px;height:100px;background-color:purple;";
    } else if (video_type_array[i] == "against") {
      document.getElementById(video_element + "_type").style =
        "width:10px;height:100px;background-color:yellow;";
    } else if (video_type_array[i] == "neutral") {
      document.getElementById(video_element + "_type").style =
        "width:10px;height:100px;background-color:green;";
    }
  }

  if (current_label == 1) {
    var video_type_text='supports Democrats'
    document.getElementById("current_video").innerHTML = "<strong>Hey, </strong> <hr style='border: none;'>you are watching a video that "+video_type_text
  } else if (current_label == 2) {
    var video_type_text='supports Republicans'
    document.getElementById("current_video").innerHTML = "<strong>Hey, </strong> <hr style='border: none;'> you are watching a video that "+video_type_text
  } else if (current_label == 0) {
    var video_type_text='unbiased video'
      document.getElementById("current_video").innerHTML = "<strong>Hey, </strong> <hr style='border: none;'> you are watching an "+video_type_text
  }

  //checking for alert alert

  if (alert_message) {
    document.getElementById("alert-message").style = "display:block";
  }else{
    toggle('tab-body','none')
    document.getElementById("just-message").style = "display:block";
    document.getElementById('body-container').style.height='220px'
  }

  //initiating extension with recommendations tab

  document.getElementById("recommendations-tab").classList.add("active");
  document.getElementById("statistics-body").style.display = "none";

};

const doSomething = async () => {
  await sleep(1200);
  console.log("Code Starting");
  console.log(curr_url);

  var flag_article_370 = false;
  for (let i = 0; i < article_370.length; i++) {
    if (curr_url === article_370[i].Video_Url) {
      flag_article_370 = true;
      console.log("video found Article 370");
      break;
    }
  }

  var flag_uselections = false;
  for (let i = 0; i < US_elctions.length; i++) {
    if (curr_url === US_elctions[i].urls) {
      flag_uselections = true;
      console.log("video found US elections");
      break;
    }
  }

  if (flag_article_370) {
    Article370();
  } else {
    us_elections();
  }
};

doSomething();
