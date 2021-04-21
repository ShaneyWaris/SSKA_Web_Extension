var alert_message= false;
var Colors = [ 'purple', 'yellow',  'green']
pie_chart = document.getElementById('pie-chart');
var data = [{
values: [2, 3, 5],
labels: ['For', 'Against', 'Neutral'],
marker: {colors: Colors},
type: 'pie'
}];

var layout = {
paper_bgcolor: 'black',
height: 600,
width: 500,
legend: {
    font: {
    color: 'white'
    }
 }
};

Plotly.newPlot('pie-chart', data, layout);

var video_id_array=["jBTVzb2vg0U","9et5qzuzbQM","fYiVvgjuvnU","Y2zc2IeVX_g","EhysXiodbLc","Vx7YkKpt-J4","QzW2Jvpe03E","YzYghxaCh1c","I1RFUc0Erng","2Vv-BfVoq4g"]
var video_title_array=["When we feel young","Riha","Break free","OCEAN by Anuv Jain (a song on the ukulele)","Really? Not Really","Vilen - Chidiya (Official Video)","Qareeb - Kamakshi Khanna | Official Music Video","Mundane","i'll find my way to you tomorrow","Ed Sheeran - Perfect (Official Music Video)"]
var video_type_array=["for","against","neutral","neutral","for","for","for","against","neutral","neutral","for"]

function open_link(video_number) {
    parent.location="https://www.youtube.com/watch?v="+video_id_array[video_number-1]
}

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
    console.log(evt)
    }

for (i = 0; i < video_id_array.length; i++) {
    var video_element = 'video_'+String(i+1)

    var video_thumbnail= document.getElementById(video_element +'_thumbnail')
    video_thumbnail.src="http://img.youtube.com/vi/"+video_id_array[i]+"/0.jpg"
    video_thumbnail.height=100
    video_thumbnail.width=150
    video_thumbnail.classList.add("thumbnail")

    var video_title=video_title_array[i]
    document.getElementById(video_element+'_title').innerHTML = video_title;

    if (video_type_array[i]=="for") {
        document.getElementById(video_element+'_type').style="width:10px;height:100px;background-color:purple;"
    }else if (video_type_array[i]=="against") {
        document.getElementById(video_element+'_type').style="width:10px;height:100px;background-color:yellow;"
    }else if (video_type_array[i]=="neutral") {
        document.getElementById(video_element+'_type').style="width:10px;height:100px;background-color:green;"
    }

    alert_message=true;

    if(alert_message){
        document.getElementById("alert-message").style="display:block"
    }

    
} 


document.getElementById("recommendations-tab").classList.add('active'); 
document.getElementById("statistics-body").style.display='none';  
