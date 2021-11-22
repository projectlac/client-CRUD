<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="">
          <v-file-input
            label="File input"
            filled
            @change="handleImg"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-btn color="primary" @click="addCat(file)"> Thêm </v-btn>
        </div>

        <div class="hahahah" v-for="l in listPost" :key="l.id">
          <div class="d-flex flex-wrap justify-center mt-5">
            <div
              v-if="checkactive != l.id"
              class="d-flex flex-wrap justify-center"
            >
              <p class="mr-4">{{ l.img }}</p>
            </div>
            <p v-else>
              <v-text-field
                v-model="valueU"
                label="Cat's name"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="sale_priceU"
                label="Giá"
                outlined
              ></v-text-field>
            </p>
            <div v-if="checkactive != l.id">
              <v-btn color="primary" @click="delCat(l.id)"> DEL </v-btn>
              <v-btn color="warning" @click="open(l.id), defaultU(l.id)">
                UPDATE
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                color="warning"
                @click="updateCat([l.id, valueU, sale_priceU]), refreshU()"
              >
                UPDATE
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
@Component
export default class HAHA extends Vue {
  value: string = "";
  sale_price: number = 0;
  valueU: string = "";
  sale_priceU: number = 0;

  file: any = null;
  handleImg(e: any) {
    // this.file = e;
    this.file = new File([e], `${Date.now()}.${e.name}`, { type: e.type });
  }
  refreshAll() {
    this.value = "";
    this.sale_price = 0;
  }
  defaultU(val: number) {
    // console.log(val);
    this.listPost.map((l: any) => {
      if (l.id == val) {
        this.valueU = l.name;
        this.sale_priceU = l.sale_price;
      }
    });
  }
  refreshU() {
    this.valueU = "";
    this.sale_priceU = 0;
  }
  @Getter listPost!: any;

  @Action getData!: () => any;

  @Getter checkactive!: number;

  @Action("open") open(id: number) {
    this.open(id);
  }

  created() {
    this.getData();
  }
  @Action("delCat") delCat(id: number) {
    this.delCat(id);
  }
  @Action("addCat") addCat(val: any) {
    this.addCat(val);
  }
  @Action("updateCat") updateCat(val: any) {
    this.updateCat(val);
  }
}
</script>
