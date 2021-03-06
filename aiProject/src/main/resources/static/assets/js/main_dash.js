(function($) {
	
	var USER_ENO = '001';	//유저번호 현재는 테스트를 위해 고정값임
	
	 //타임리프를 통해 얻어오는 세션값. 
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	//유저번호 파라미터
	var param ={ USER_ENO : USER_ENO};
	
	//날짜
	var today = moment().format('YY/MM/DD');
	var month = moment().format('MM');
	
	//권한 체크
	if(auth==""){
		console.log("nolog");
	}else if(auth=="01"){
		console.log("user");
	}
	
	//+++++++++++++++++++++++++++++++++++++캘린더++++++++++++++++++++++++++++++++++++
	
	//캘린더 생성
	
	monthData(); 
	
	function monthData(){
		
		var param = {
			USER_ENO : USER_ENO,
			DELNG_DATE : month
		}
		
		$.ajax({
			url : "/dash/cal",
			type : "Post",
			data : param,
			dataType : 'text',
			success : function(data) {
					
					var grid = JSON.parse(data);
					console.log(grid);
					
					var calendarEl = document.getElementById('calendar_div');
			        var calendar = new FullCalendar.Calendar(calendarEl, {
			         headerToolbar: {
			        //left: 'prev,next today',
					left : '',
			        center: 'title',
			        right: ''
			      },
			      locale: 'ko',
			      buttonIcons: false, // show the prev/next text
			      navLinks: true, // can click day/week names to navigate views
			      editable: true,
			      dayMaxEvents: true, // allow "more" link when too many events
			      events: grid
			    });
			        calendar.render();
												
				},
			error : function(request, status, error) {
				
					console.log(error);
				
				}
		});
		
		
	};
	

//++++++++++++++++++++++++++++++++++구글 차트+++++++++++++++++++++++++++++++++++++++++++++++++
	/*
	* normal : 정상인 기기 
	* incident : 장애기기
	*
	*/
	var normal; 
	var incident;
	
    google.charts.load('current', {'packages':['corechart']});
      
    google.charts.setOnLoadCallback(drawChart);
    
	read();
	
    function drawChart() {
    
	var options ={
		title : '전체기기 : '+(normal+incident)+'대  \r\n  (정상 : '+normal+'대    장애 : '+incident+'대) ',
		sliceVisibilityThreshold: '0'
		
	};

	  var jsonData = {
						  "cols": [
						        {"id":"","label":"이름","pattern":"","type":"string"},
						        {"id":"","label":"기기수","pattern":"","type":"number"}
						      ],
						  "rows": [
						        {"c":[{"v":"정상","f":null},{"v":normal,"f":null}]},
						       
						        {"c":[{"v":"장애","f":null},{"v":incident,"f":null}]},
						      ]
						};
      var data = new google.visualization.DataTable(jsonData);

      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
	
	function read(){
		$.ajax({
			url : "/main/chart_list",
			type : "Post",
			data : param,
			dataType : 'text',
			success : function(data) {
					console.log(data);
					var result = JSON.parse(data);
					
					normal = result[0].DEVC_TOT-result[0].OB_TOT;
					incident = result[0].OB_TOT;
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	}
	
	
	
	
	//+++++++++++++++++++++++++++++++++++++++++++재고 테이블++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	var param ={
		USER_ENO : USER_ENO,
		BR_CD : 'all'
		}
		
		$.ajax({
			url : "/sales/stkDo",
			type : "Post",
			data : param,
			dataType : 'text',
			success : function(data) {
					
						var grid = JSON.parse(data);
						
						$('#example').DataTable( {
							"data" :grid,
					        "scrollX": true,
							"scrollY": true,
							"paging": false,
							"responsive": true,
							"autofill": true,
							"columns" : [
								            { "data" : "BR_NM" },
								            { "data" : "DEVC_UNO" },
								            { "data" : "GOODS_NM" },
								            { "data" : "GOODS_QY" }
								        ],
							"destroy": true,
							"order": [[0, 'asc']],
  							"ordering": true,
							"width" : "100%",
							"height" :"100%"
					    } );
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	
})(jQuery);