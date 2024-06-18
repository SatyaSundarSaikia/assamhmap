window.onload = init;

function init() {
    const map = new ol.Map({
    view: new ol.View ({
        projection: 'EPSG:4326',
        center: [92.67, 26.18],
        zoom: 1,
        extent:[89.8,24.0,96.0,28.0]
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'openlayers-map'
})
}