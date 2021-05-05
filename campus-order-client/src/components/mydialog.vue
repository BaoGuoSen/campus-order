<template>
  <div>
    <el-dialog title="新增菜品"
      :center="false"
      :close-on-click-modal="false"
      :show-close="false"
      :visible.sync="dialogDishVisible">
      <el-form :model="dish" style="width:80%;">
        <el-form-item label="菜名:" label-width="140px">
          <el-input v-model="dish.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格:" label-width="140px">
          <el-input v-model="dish.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传菜品图片:" label-width="140px">
          <el-upload
            action="api/file/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :on-exceed="handleExceed"
            :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="addDish">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const shortid = require('shortid')
export default {
  name: '',
  props: {
    dialogDishVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    dish: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    addDish () {
      this.dish.id = shortid.generate()
      this.dish.storeId = sessionStorage.getItem('storeId')
      this.$emit('addDish', this.dish)
      this.hideDialog()
    },
    hideDialog () {
      this.$emit('hideDialog')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请将当前文件删除后在执行上传操作`)
    },
    handlePictureCardPreview (file) {
      console.log('preview')
    },
    handleAvatarSuccess (res, file) {
      console.log(res[0], 'res')
      console.log(file, 'file')
      this.dish.src = res[0]
    }
  }
}
</script>
<style scoped>

</style>
