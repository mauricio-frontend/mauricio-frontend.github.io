<!DOCTYPE HTML>
<html>

<head>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
	<script src="canvasjs.min.js"></script>

	<script type="text/javascript">
		var arrayTemperatures = [
			{
				x: new Date(), 
				y: 0
			}
		];

		var arrayHumidities = [
			{
				x : new Date(),
				y : 0
			}	
		];


		window.onload = function () {
			var chart = new CanvasJS.Chart("chartContainer", {
				title: {
					text: "Monitor - Temperature and Humidity",
					margin : 25,
					padding : 10,
					borderThickness : 1,
					fontSize: 22,
					cornerRadius: 5,
					fontWeight: "normal"
				},
				animationEnabled: true,
				axisX: {
					gridColor: "Silver",
					tickColor: "silver",
					valueFormatString: "DD/MM/YY - HH:mm:ss"
				},
				toolTip: {
					shared: true
				},
				theme: "theme2",
				axisY: {
					gridColor: "Silver",
					tickColor: "silver"
				},
				legend: {
					verticalAlign: "center",
					horizontalAlign: "right"
				},
				data: [
					{
						xValueFormatString: "DD/MM/YY - HH:mm:ss",
						type: "line",
						showInLegend: true,
						lineThickness: 2,
						name: "Temperature (ºC)",
						markerType: "square",
						color: "#F08080",
						dataPoints: arrayTemperatures
					},
					{
						xValueFormatString: "DD/MM/YY - HH:mm:ss",
						type: "line",
						showInLegend: true,
						name: "Humidity (%)",
						color: "#20B2AA",
						lineThickness: 2,
						dataPoints: arrayHumidities
					}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();


			var loadSensorData = function () {
				$.ajax({
					type : 'get',
					url : 'https://cloud.arest.io/008',
					dataType : 'json',
					json : true,
					cache : false
				}).done(function(response) {
					arrayTemperatures.push({
						x : new Date(),
						y : response.variables.temperature
					});

					arrayHumidities.push({
						x : new Date(),
						y : response.variables.humidity
					});

					chart.render();

					window.setTimeout(function() {
						loadSensorData();
					}, 10000);
				});
			};

			window.setTimeout(function() {
				loadSensorData();
			}, 10000);
		}
	</script>
	<title>Monitor - Temperature and Humidity</title>
</head>
<body>
	<div id="chartContainer" style="height: 400px; width: 100%;">
	</div>
</body>
</html>
