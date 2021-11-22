<template>
  <v-data-table
    :headers="headers"
    :items="listPost"
    sort-by="calories"
    class="elevation-1 mt-6 pt-2"
    :search="search"
    :custom-filter="filterOnlyCapsText"
  >
    <template v-slot:top>
      <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
      <v-toolbar flat>
        <v-toolbar-title>Danh sách thức thần</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-file-input
                      label="Image"
                      required
                      v-model="customImage"
                      @change="onFileChange($event)"
                    ></v-file-input>
                    <img
                      v-if="imagePreviewURL"
                      :src="imagePreviewURL"
                      alt=""
                      style="max-width: 100%; width: 250px; object-fit: cover"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Tên thức thần"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-select
                        :items="['SP', 'SSR', 'SR', 'R']"
                        label="Độ hiếm"
                        v-model="editedItem.rank"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-select
                        :items="['SSR', 'SR', 'R']"
                        label="Độ ưu tiên"
                        v-model="editedItem.prioritized"
                      ></v-select>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
type Data = {
  id: number;
  name: string;
  image: string;
  rank: string;
  prioritized: string;
};
@Component({})
export default class Score extends Vue {
  @Getter listPost!: any;
  @Action getData!: () => any;

  @Action("addCat")
  addCat(val: any) {
    this.addCat(val);
  }
  @Action("delCat")
  delCat(val: any) {
    this.delCat(val);
  }
  @Action("updateCat")
  updateCat(val: any) {
    this.updateCat(val);
  }

  created() {
    this.getData();

    // this.initialize();
  }
  customImage: any = null;
  localImage: any = null;
  localFile: any = null;
  search: string = "";
  imagePreviewURL: string = "";
  dialog: boolean = false;
  dialogDelete: boolean = false;
  headers: Array<object> = [
    {
      text: "Tên thức thần",
      align: "start",
      sortable: false,
      value: "name",
    },

    // { text: "Hình ảnh", value: "image" },
    { text: "Bậc/ Độ hiếm", value: "rank" },
    { text: "Độ ưu tiên", value: "prioritized" },

    { text: "Actions", value: "actions", sortable: false },
  ];

  editedIndex: number = -1;
  editedItem: Data = {
    id: 0,
    name: "",
    image: "",
    rank: "",
    prioritized: "",
  };
  defaultItem: Data = {
    id: 0,
    name: "",
    image: "",
    rank: "",
    prioritized: "",
  };
  get formTitle() {
    return this.editedIndex === -1 ? "New Item" : "Edit Item";
  }
  @Watch("dialog")
  wDialog(val: any) {
    val || this.close();
  }
  @Watch("dialogDelete")
  wDialogDelete(val: any) {
    val || this.closeDelete();
  }

  editItem(item: any) {
    this.editedIndex = this.listPost.indexOf(item);

    this.editedItem = Object.assign({}, item);
    this.imagePreviewURL = item.img;

    this.dialog = true;
  }

  deleteItem(item: any) {
    this.editedItem = Object.assign({}, item);

    this.dialogDelete = true;
  }

  deleteItemConfirm() {
    this.delCat(this.editedItem.id);
    this.closeDelete();
  }

  close() {
    this.dialog = false;
    this.customImage = null;
    this.imagePreviewURL = "";
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }
  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  save() {
    if (this.editedIndex > -1) {
      // console.log(this.editedItem);
      let imageName;
      if (this.customImage == null) {
        imageName = null;
      } else {
        imageName = new File(
          [this.customImage],
          `${Date.now()}.${this.customImage.name}`,
          { type: this.customImage.type }
        );
      }
      const data = Object.assign({}, this.editedItem, {
        image: imageName,
      });
      // console.log(data);
      // console.log(data.id);
      this.updateCat(data);
    } else {
      const data = Object.assign({}, this.editedItem, {
        image: new File(
          [this.customImage],
          `${Date.now()}.${this.customImage.name}`,
          { type: this.customImage.type }
        ),
      });
      // console.log(data);
      this.addCat(data);
    }
    this.close();
  }

  onFileChange(event: any) {
    const file = event;

    this.customImage = event;
    if (file) {
      this.imagePreviewURL = URL.createObjectURL(file);

      URL.revokeObjectURL(file); // free memory
    } else {
      this.imagePreviewURL = "";
      this.customImage = null;
    }
  }

  filterOnlyCapsText(value: string, search: string) {
    return (
      value != null &&
      search != null &&
      typeof value === "string" &&
      value.toString().toLocaleLowerCase().indexOf(search) !== -1
    );
  }
}
</script>
