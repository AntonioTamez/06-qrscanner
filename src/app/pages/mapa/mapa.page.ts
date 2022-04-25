import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl : any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit , AfterViewInit{

  lat: number;
  lang:number;

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {

    let geo: any = this.route.snapshot.paramMap.get('geo');

    //substring of geo
    geo = geo.substring(4);
    geo = geo.split(',');

    this.lat = Number(geo[0]);
    this.lang = Number(geo[1]);

    console.log(this.lat, this.lang);

  }

  ngAfterViewInit(){
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pbzZ0IiwiYSI6ImNsMjh4MWcyYzBiNnoza28zaGdtc2N4MmgifQ.1jl7bS2IQr8XcZPIM3tPyw';
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lang, this.lat],
      zoom: 15.5,
      pitch: 45
      });

      map.on('load', () => {
        // Start the animation.
        //rotateCamera(0);

        map.resize();
        
        // Marker
        const marker = new mapboxgl.Marker()
        .setLngLat([this.lang, this.lat])
        .addTo(map);
 

         
        // Add 3d buildings and remove label layers to enhance the map
        const layers = map.getStyle().layers;
        for (const layer of layers) {
            if (layer.type === 'symbol' && layer.layout['text-field']) {
            
              // remove text labels
              map.removeLayer(layer.id);
            }
        }
         
        map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
              'fill-extrusion-color': '#aaa',
            
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
              ],
              'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
          }
        });
      });

  }

}
