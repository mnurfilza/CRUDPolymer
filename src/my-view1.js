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
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
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

        .kartu{
          font-size: 20px;
          box-shadow: 0 2px 2px -2px gray;
          margin-top : 20px;
         
         }

        .headerContainer{
          width:100%;
          margin-left: 30px;
        }
        .anchor{
          text-decoration:none;
          color:black;
        }

        .button{
         margin-left:calc(60vw - 105px);
        }
       
      </style>
        
      <iron-ajax
      auto
      id="ajax"
      method="GET"
      handle-as="json"
      on-response="handleResponse"
      on-error="errorResponse">
     </iron-ajax>

     <app-header-layout>
        <app-header class='header' slot='header' fixed effect="waterfall">
          <app-toolbar>
            <div class="tittleContainer layout horizontal">
              <div main-title="">My Mahasiswa</div>

              <div class="button layout horizontal" >
                <paper-icon-button icon="delete" ></paper-icon-button>
                <paper-icon-button icon="add-circle" on-tap="_addMahasiswa"></paper-icon-button> 
              </div> 
            </div>
          </app-toolbar> 

          <app-toolbar>
            <div class="headerContainer layout horizontal">
              <div style="width:50%">NPM</div>
              <div style="width:50%">Nama</div>
            </div>
          </app-toolbar>
        </app-header>


        <iron-list items="[[data]]" as="item" id="list">
          <template>
            <div class="mhsContainer">
              <a class="anchor" href="/my-view1-card/[[item.npm]]" tabindex="-1">
                <paper-item class="kartu layout horizontal">
                  <div style="width:50%; margin-left:20px;">[[item.npm]]</div>
                  <div style="width:50%">[[item.nama]]</div>
                </paper-item>
              </a>
            </div>
          </template>
        </iron-list>
     </app-header-layout>
     
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

  _computeView(page) {
    if (page !== 'view1') {
      return;
    }
    this.$.ajax.url = window.MyAppGlobals.apiPath + "/api/v1/testapi/mahasiswa";
    this.$.ajax.generateRequest();
  }  

  _addMahasiswa(){
    
    window.history.pushState({},null,'/my-view1-card/0');
    window.dispatchEvent(new CustomEvent('location-changed'));

  }

  handleResponse(e){
    var data = e.detail.response;
    this.data = data.data;
  }
  errorResponse(e){
    console.log(e.detail.response);
  }
}

window.customElements.define('my-view1', MyView1);
