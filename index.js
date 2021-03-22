$(function () {
  // drag upload
  var div = document.querySelector(".box");

  div.addEventListener("dragenter", function (e) {
    //drag in
    e.preventDefault();
  });
  div.addEventListener("dragover", function (e) {
    //drag back and forth
    e.preventDefault();
  });
  div.addEventListener("drop", function (event) {
    event.preventDefault();

    // get file 
    var fileList = [].slice.call(event.dataTransfer.files);
    let file = fileList[0];
    // read file and render json
    readFiles(file);
  });

  // click upload
  var fileDom = document.querySelector("#file");

  fileDom.addEventListener("change", function (e) {
    let file = e.target.files[0];
    readFiles(file);
  });

  // readfile

  function readFiles(file) {
    console.log('file', file)
    if (file.name.includes('.geojson')) {
      // read file
      var reader = new FileReader();
      reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
          // get file content
          var content = reader.result;
          let json = JSON.parse(content);
          // set jsonData
          // $("#json").JSONView(json);
          
          
          drawMap(json)
        }
      };
      reader.readAsBinaryString(file);
    } else {
      alert("only geojson");
    }
  }

  // echarts
  function drawMap(geoJson) {
    var myChart = echarts.init(document.getElementById('main'));
    echarts.registerMap('world', geoJson);

    const option = {
      geo: {
        map: 'world',
        // backgroundColor: '#00BFFF',
        // silent: true,
        // z: -90,
        // label: {
        //   emphasis: {
        //     show: false,
        //     areaColor: '#eee',
        //   },
        // },
        // itemStyle: {
        //   normal: {
        //     // borderColor: '#c9d8ff',  //map view
        //     borderColor: '#fff',
        //     borderWidth: 0.1,
        //     areaColor: '#8b76d6',
        //     shadowColor: '#567ad4',
        //   },
        //   emphasis: {
        //     shadowColor: 10,
        //     borderColor: 'rgba(201, 216, 255)',
        //     areaColor: '#324fb1', //chosen map view
        //     borderWidth: 0,
        //   },
        // },
        zoom: 1.2,
      },
      series: [],
    };

    myChart.setOption(option);
  }
});
