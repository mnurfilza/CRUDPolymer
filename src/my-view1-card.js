/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import './shared-styles.js';

class MyView1Card extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {
          display: block;
        }
        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .headerContainer{
          width:100%;
          margin-left: 30px;
        }

        .button{
          margin-left:calc(55vw - 105px);
         }

      </style>

      <iron-ajax
      id="ajax"
      handle-as="json"
      on-response="handleResponse"
      on-error="errorResponses">
      </iron-ajax>

      <app-header-layout>
        <app-header class='header' slot='header' fixed effect="waterfall">
          <app-toolbar>
            <div class="tittleContainer layout horizontal">
              <paper-icon-button icon="close" on-tap="_closeTab"></paper-icon-button> 
              <div main-title=""  style="100%;margin-top:5px;">My Mahasiswa</div>

              <div class="button layout horizontal" >
                <paper-icon-button icon="delete" ></paper-icon-button>
                <paper-icon-button icon="add-circle" on-tap="_addMahasiswa"></paper-icon-button> 
              </div> 
            </div>
          </app-toolbar> 
        </app-header-layout>

        <div class="card">
          <paper-input id="npm" label="NPM"></paper-input>
          <paper-input id="nama" label="Nama"></paper-input>   
        </div> 
    `;
  }

  static get properties(){
    return {
      data:{
        type:Object,
        value:[]
      },
      page:String,
    };

  }

  static get observers(){
    return [
      '_computeView(page)'
    ];
  }

  _computeView(page){
    let data = window.location.pathname.split('/');
    if (page !== 'my-view1-card') {
      return;
    }
  
    if (data[2] === "0") {
      this.$.npm.value ='';
      this.$.nama.value ='';
      return;
    }
    let url = window.MyAppGlobals.apiPath + "/api/v1/testapi/mahasiswa/" + data[2];
    this.$.ajax.url = url;
    this.$.ajax.method = 'GET';
    this.$.ajax.generateRequest();
  }

  _closeTab(){
    window.history.pushState({},null,'/view1');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  _addMahasiswa(){
    var npm = this.shadowRoot.querySelector("#npm").value;
    var nama = this.shadowRoot.querySelector("#nama").value;
    var pathName = window.location.pathname.split('/');
    if (pathName[2] === '0') {
     var data = {
        npm:npm,
        nama:nama
      };
      this.$.ajax.url = window.MyAppGlobals.apiPath + "/api/v1/testapi/mahasiswa";
      this.$.ajax.method = "POST";
      this.$.ajax.body = JSON.stringify(data);
      this.$.npm.value ="";
      this.$.nama.value ="";
    }else{
     var data = {
        npm:npm,
        nama:nama
      };
      this.$.ajax.method = 'PUT';
      this.$.ajax.body = JSON.stringify(data)
      this.$.ajax.url = window.MyAppGlobals.apiPath + "/api/v1/testapi/mahasiswa/" + pathName[2];
    }
    this.$.ajax.generateRequest();
  }

  handleResponse(e){
    let data = e.detail.response.data;
    if (!data) {
      return;
    }
    this.$.npm.value = data.npm;
    this.$.nama.value = data.nama;

  }
}

window.customElements.define('my-view1-card', MyView1Card);
