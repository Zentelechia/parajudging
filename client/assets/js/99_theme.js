function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//  Chat - Initializes the autosize library and scrolls chat list to bottom

/* global autosize */


/* global Draggable, SwapAnimation */

/* eslint-disable no-unused-vars */


var mrAutoWidth = function () {
  /*
     Special Thanks to Lim Yuan Qing
     for autosize-input
     npm install --save autosize-input
      The MIT License (MIT)
     Copyright (c) 2018 Lim Yuan Qing
     Permission is hereby granted, free of charge, to any person obtaining
     a copy of this software and associated documentation files (the "Software"),
     to deal in the Software without restriction, including without limitation
     the rights to use, copy, modify, merge, publish, distribute, sublicense,
     and/or sell copies of the Software, and to permit persons to whom the Software
     is furnished to do so, subject to the following conditions:
     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
     BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
     ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
  var AutoWidth =
  /*#__PURE__*/
  function () {
    function AutoWidth(element, options) {
      this.element = element;
      var elementStyle = window.getComputedStyle(this.element); // prettier-ignore

      this.elementCssText = "box-sizing:" + elementStyle.boxSizing + "\n                          ;border-left:" + elementStyle.borderLeftWidth + " solid red           \n                          ;border-right:" + elementStyle.borderRightWidth + " solid red\n                          ;font-family:" + elementStyle.fontFamily + "\n                          ;font-feature-settings:" + elementStyle.fontFeatureSettings + "\n                          ;font-kerning:" + elementStyle.fontKerning + "\n                          ;font-size:" + elementStyle.fontSize + "\n                          ;font-stretch:" + elementStyle.fontStretch + "\n                          ;font-style:" + elementStyle.fontStyle + "\n                          ;font-variant:" + elementStyle.fontVariant + "\n                          ;font-variant-caps:" + elementStyle.fontVariantCaps + "\n                          ;font-variant-ligatures:" + elementStyle.fontVariantLigatures + "\n                          ;font-variant-numeric:" + elementStyle.fontVariantNumeric + "\n                          ;font-weight:" + elementStyle.fontWeight + "\n                          ;letter-spacing:" + elementStyle.letterSpacing + "\n                          ;margin-left:" + elementStyle.marginLeft + "\n                          ;margin-right:" + elementStyle.marginRight + "\n                          ;padding-left:" + elementStyle.paddingLeft + "\n                          ;padding-right:" + elementStyle.paddingRight + "\n                          ;text-indent:" + elementStyle.textIndent + "\n                          ;text-transform:" + elementStyle.textTransform + ";";
      this.GHOST_ELEMENT_ID = '__autosizeInputGhost';
      element.addEventListener('input', AutoWidth.passWidth);
      element.addEventListener('keydown', AutoWidth.passWidth);
      element.addEventListener('cut', AutoWidth.passWidth);
      element.addEventListener('paste', AutoWidth.passWidth);
      this.extraPixels = options && options.extraPixels ? parseInt(options.extraPixels, 10) : 0;
      this.width = AutoWidth.setWidth(this); // Set `min-width` only if `options.minWidth` was set, and only if the initial
      // width is non-zero.

      if (options && options.minWidth && this.width !== '0px') {
        this.element.style.minWidth = this.width;
      }
    }

    AutoWidth.setWidth = function setWidth(input) {
      var string = input.element.value || input.element.getAttribute('placeholder') || ''; // Check if the `ghostElement` exists. If no, create it.

      var ghostElement = document.getElementById(input.GHOST_ELEMENT_ID) || input.createGhostElement(); // Copy all width-affecting styles to the `ghostElement`.

      ghostElement.style.cssText += input.elementCssText;
      ghostElement.innerHTML = AutoWidth.escapeSpecialCharacters(string); // Copy the width of `ghostElement` to `element`.

      var _window$getComputedSt = window.getComputedStyle(ghostElement),
          width = _window$getComputedSt.width;

      width = Math.ceil(width.replace('px', '')) + input.extraPixels;
      /* eslint-disable no-param-reassign */

      input.element.style.width = width + "px";
      return width;
    };

    AutoWidth.passWidth = function passWidth(evt) {
      var input = $(evt.target).data('autoWidth');
      AutoWidth.setWidth(input);
    };

    AutoWidth.mapSpecialCharacterToCharacterEntity = function mapSpecialCharacterToCharacterEntity(specialCharacter) {
      var characterEntities = {
        ' ': 'nbsp',
        '<': 'lt',
        '>': 'gt'
      };
      return "&" + characterEntities[specialCharacter] + ";";
    };

    AutoWidth.escapeSpecialCharacters = function escapeSpecialCharacters(string) {
      return string.replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }; // Create `ghostElement`, with inline styles to hide it and ensure that the text is all
    // on a single line.


    var _proto = AutoWidth.prototype;

    _proto.createGhostElement = function createGhostElement() {
      var ghostElement = document.createElement('div');
      ghostElement.id = this.GHOST_ELEMENT_ID;
      ghostElement.style.cssText = 'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;';
      document.body.appendChild(ghostElement);
      return ghostElement;
    };

    return AutoWidth;
  }();

  $(document).ready(function () {
    var checklistItems = document.querySelectorAll('form.checklist .custom-checkbox div input');

    if (checklistItems) {
      mrUtil.forEach(checklistItems, function (index, item) {
        $(item).data('autoWidth', new AutoWidth(item, {
          extraPixels: 3
        }));
        item.addEventListener('keypress', function (evt) {
          if (evt.which === 13) {
            evt.preventDefault();
          }
        });
      });
    }
  });
  return AutoWidth;
}();

var mrChecklist = {
  sortableChecklists: new Sortable(document.querySelectorAll('form.checklist, .drop-to-delete'), {
    // plugins: [SwapAnimation.default],
    draggable: '.checklist > .row',
    handle: '.form-group > span > i'
  })
}; 
import { Draggable } from '@shopify/draggable';
import SwapAnimation from '@shopify/draggable/lib/plugins/swap-animation';
import { Sortable, Plugins } from '@shopify/draggable';



var mrKanban = {
  sortableKanbanLists: new Sortable(document.querySelectorAll('div.kanban-board'), {
    draggable: '.kanban-col:not(:last-child)',
    handle: '.card-list-header'
  }),
  sortableKanbanCards: new Sortable(document.querySelectorAll('.kanban-col .card-list-body'), {
  //  plugins: [SwapAnimation.default],
    draggable: '.card-kanban',
    handle: '.card-kanban',
    appendTo: 'body'
  })
}; //
//
// prism.js
//
// Initialises the prism code highlighting plugin

/* global Prism */

Prism.highlightAll(); //
//
// Util
//
// Medium Rare utility functions
// v 1.1.0

var mrUtil = function ($) {
  // Activate tooltips
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body'
  });
  var Util = {
    activateIframeSrc: function activateIframeSrc(iframe) {
      var $iframe = $(iframe);

      if ($iframe.attr('data-src')) {
        $iframe.attr('src', $iframe.attr('data-src'));
      }
    },
    idleIframeSrc: function idleIframeSrc(iframe) {
      var $iframe = $(iframe);
      $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
    },
    forEach: function forEach(array, callback, scope) {
      for (var i = 0; i < array.length; i += 1) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    },
    dedupArray: function dedupArray(arr) {
      return arr.reduce(function (p, c) {
        // create an identifying String from the object values
        var id = JSON.stringify(c); // if the JSON string is not found in the temp array
        // add the object to the output array
        // and add the key to the temp array

        if (p.temp.indexOf(id) === -1) {
          p.out.push(c);
          p.temp.push(id);
        }

        return p; // return the deduped array
      }, {
        temp: [],
        out: []
      }).out;
    }
  };
  return Util;
}(jQuery);