<template>
    <v-dialog v-model="showDialog" scrollable persistent :max-width="maxwidth">
      <v-card class="dialog-box">
        <v-row no-gutters style="height: 100%">
          <v-col style="height: 100%">
            <v-row v-if="showCloseButton" no-gutters justify="end">
              <v-icon color="grey darken-1" @click.stop="showDialog = false">
                mdi-close
              </v-icon>
            </v-row>
            <v-row v-if="$slots['header']" no-gutters>
              <h3>
                <slot name="header"></slot>
              </h3>
            </v-row>
            <div class="thin-scrollbar" :style="{ 'max-height': maxHeight }">
              <v-row no-gutters style="padding-right: 14px">
                <v-col>
                  <slot></slot>
                </v-col>
              </v-row>
            </div>
            <v-row v-if="$slots['actions']" class="pt-3" no-gutters align="center" :justify="justifyActions" style="padding-right: 14px">
              <slot name="actions"></slot>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: null,
      },
      justifyActions: {
        type: String,
        default: 'end',
      },
      showCloseButton:{
        type: Boolean,
        default: true,
      }
    },
    computed: {
      maxwidth() {
        return this.maxWidth || 600;
      },
      maxHeight() {
        let substractHeight = 24;
  
        if (this.$slots['header']) {
          substractHeight += 30;
        }
  
        if (this.$slots['actions']) {
          substractHeight += 48;
        }
  
        return `calc(100% - ${substractHeight}px)`;
      },
      showDialog: {
        // getter
        get: function() {
          return this.show;
        },
        // setter
        set: function(newValue) {
          this.$emit('change-state', newValue);
        },
      },
    },
  };
  </script>

  <style scoped>
   .dialog-box {
     border-radius: 4px;
     padding: 14px 14px 28px 28px;
    }
    .thin-scrollbar {
    overflow-y: auto !important;
    overflow-x: hidden;

    /*firefox*/
    scrollbar-color: grey white;
    scrollbar-width: thin;
    }

    /* edge and chrome */
    /* total width */
    .thin-scrollbar::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
    }

    /* background of the scrollbar except button or resizer */
    .thin-scrollbar::-webkit-scrollbar-track {
    background-color: #fff;
    }
    .thin-scrollbar::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
    }

    /* scrollbar itself */
    .thin-scrollbar::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
    }
    .thin-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
    }

    /* set button(top and bottom of the scrollbar) */
    .thin-scrollbar::-webkit-scrollbar-button {
    display: none;
    }
  </style>
  