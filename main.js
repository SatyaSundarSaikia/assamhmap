window.onload = init;

function init() {
    const map = new ol.Map({
    view: new ol.View ({
        projection: 'EPSG:4326',
        center: [92.67, 26.18],
        zoom: 10,
        extent:[89.75609601048096,26.066782309574638,96.16464583651289,28.058871646385747]
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'openlayers-map'
})
// Assam cities geojson
const assamCitiesStyle = function(feature){
    let cityID = feature.get('Id');
    let cityIDString = cityID.toString();
    const styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: [77, 219, 105, 0.6]
          }),
          stroke: new ol.style.Stroke({
            color: [6, 125, 34, 1],
            width: 2
          }),
          radius: 12
        }),
        text: new ol.style.Text({
          text: cityIDString,
          scale: 1.5,
          fill: new ol.style.Fill({
            color: [232, 26, 26, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [232, 26, 26, 1],
            width:0.3
          })
        })
      })
    ]
    return styles
  }

  const styleForSelect = function(feature){
    let cityID = feature.get('Id');
    let cityIDString = cityID.toString();
    const styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: [247, 26, 10, 0.5]
          }),
          stroke: new ol.style.Stroke({
            color: [6, 125, 34, 1],
            width: 2
          }),
          radius: 12
        }),
        text: new ol.style.Text({
          text: cityIDString,
          scale: 1.5,
          fill: new ol.style.Fill({
            color: [87, 9, 9, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [87, 9, 9, 1],
            width:0.5
          })
        })
      })
    ]
    return styles
  }
const assamCitiesLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "./data/asmcities.geojson"
    }),
    style: assamCitiesStyle
})
map.addLayer(assamCitiesLayer);
//Map features click logic
const navElements = document.querySelector('.column-navigation');
const cityNameElement = document.getElementById('cityname');
const cityImageElement = document.getElementById('cityimage');
const mapView = map.getView();

map.on('singleclick', function(evt){
  console.log(evt.coordinate);
  map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
    let featureName = feature.get('Cityname');
    let navElement = navElements.children.namedItem(featureName);      
    mainLogic(feature, navElement)
  })
})

function mainLogic(feature, clickedAnchorElement){
  // Re-assign active class to the clicked element
  let currentActiveStyledElement = document.querySelector('.active');
  currentActiveStyledElement.className = currentActiveStyledElement.className.replace('active', '');
  clickedAnchorElement.className = 'active';

  // Change the view based on the feature
  let featureCoordinates = feature.get('geometry').getCoordinates();
  mapView.animate({center: featureCoordinates}, {zoom: 5})
  let assamCitiesFeatures = assamCitiesLayer.getSource().getFeatures();
  assamCitiesFeatures.forEach(function(feature){
    feature.setStyle(assamCitiesStyle);
  })
  feature.setStyle(styleForSelect)

  let featureName = feature.get('Cityname');
  let featureImage = feature.get('Cityimage');
  cityNameElement.innerHTML = 'Name of the city: ' + featureName
  cityImageElement.setAttribute('src', './data/city_imge' + featureImage + '.jpg');
}
}