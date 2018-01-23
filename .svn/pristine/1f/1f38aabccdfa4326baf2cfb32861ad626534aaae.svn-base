<template>
<section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="background-color: #f2f2f2;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.title" placeholder="电影名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="getUsers">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">新增电影</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <!--列表-->
  <el-table :data="users" stripe border highlight-current-row v-loading="listLoading" style="width: 100%;">
    <el-table-column prop="title" label="视频标题" sortable>
    </el-table-column>
    <el-table-column prop="profiles" label="视频类型" :formatter="profilesClick">
    </el-table-column>
    <el-table-column prop="imageUrl" label="视频封面" width="100">
      <template slot-scope="scope">
					<img :src="scope.row.imageUrl" alt="" width="60px">
					<!-- <el-icon name="time"></el-icon>
					<span style="margin-left: 10px">{{ scope.row.imageUrl }}</span> -->
				</template>
    </el-table-column>
    <el-table-column prop="times" label="上映日期">
    </el-table-column>
    <el-table-column prop="videoUrl" label="RUL地址">
    </el-table-column>
    <el-table-column label="置顶">
      <template slot-scope="scope">
	          <el-switch
	            name="value"
							active-text="开启"
	            inactive-text="关闭"
	            @change.native="test(scope.$index, scope.row)"
	            v-model="scope.row.type">
	          </el-switch>
	       </template>
    </el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-dropdown>
          <el-button type="primary" size="small">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="resourcesEdit(scope.$index, scope.row)">更新资源</el-dropdown-item>
            <el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)">{{scope.row.type == '1' ? '已置顶' : '置顶'}}</el-dropdown-item>
            <el-dropdown-item @click.native="handleDel(scope.$index, scope.row)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
				<!-- <el-button size="small" @click="resourcesEdit(scope.$index, scope.row)">更新资源</el-button>
				<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">{{scope.row.type == '1' ? '已置顶' : '置顶'}}</el-button>
				<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
			</template>
    </el-table-column>
  </el-table>

  <!--工具条-->
  <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
    </el-pagination>
  </el-col>
  <!--更新资源界面-->
  <el-dialog title="请输入百度网盘资源链接" :visible.sync="editResourcesVisible" :close-on-click-modal="false">
    <el-form :model="ResourcesForm" label-position="right" label-width="80px" :rules="editResourcesRules" ref="ResourcesForm" style="text-align: center;">
      <el-form-item label="资源链接" prop="videoUrl">
        <el-input v-model="ResourcesForm.videoUrl" placeholder="请输入资源链接" auto-complete="off">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="资源密码">
        <el-input v-model="ResourcesForm.videoUrlPass" placeholder="请输入资源密码" icon="warning" auto-complete="off">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="editResourcesVisible = false">取消</el-button>
      <el-button type="primary" @click.native="resourcesSubmit" :loading="resourcesLoading">提交</el-button>
    </div>
  </el-dialog>
  <!--编辑界面-->
  <el-dialog title="请上传轮播图片" :visible.sync="editFormVisible" :close-on-click-modal="false">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" style="text-align: center;">
      <el-upload class="avatar-uploader" action="https://lao47.xin/api/img_upload" :show-file-list="false" :on-success="handleCarouselSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="editForm.topImg" :src="editForm.topImg" class="editForm-topImg">
        <i v-else class="el-icon-plus avatar-uploader-icon-01"></i>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="editFormVisible = false">取消</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>

  <!--新增界面-->
  <el-dialog title="新增视频" :visible.sync="addFormVisible" :close-on-click-modal="false">
    <el-form :model="addForm" label-position="left" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item label="视频标题" prop="_id">
        <!-- <el-input v-model="addForm.title" placeholder="请输入视频标题" auto-complete="off"></el-input> -->
        <!-- 2017-10-10 -->
        <el-select v-model="addForm._id" :multiple="false" filterable remote :remote-method="remoteMovies" :loading="loading" clearable>
          <el-option v-for="item in moviesOptions" :key="item.id" :value="item.id" :label="item.title">
          </el-option>
        </el-select>
        <el-button @click="moviesMessClick">自动填写</el-button>
      </el-form-item>
      <el-form-item label="视频类型">
        <template>
					  <el-select
					    v-model="addForm.profiles"
					    multiple
					    filterable
					    allow-create
					    placeholder="请选择视频类型">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</template>
      </el-form-item>
      <el-form-item label="豆瓣评分">
        <el-input v-model="addForm.average" placeholder="请输入评分" auto-complete="off" style="width:217px;"></el-input>
      </el-form-item>
      <el-form-item label="视频封面">
        <el-upload class="avatar-uploader" action="https://lao47.xin/api/img_upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="网盘地址">
        <el-input v-model="addForm.videoUrl" placeholder="请输入网盘地址">
          <template slot="prepend">Http://</template>
          <template><el-button slot="append" icon="setting" @click="videoUrlPass">添加密码</el-button></template>
        </el-input>
      </el-form-item>
      <el-form-item v-for="(domain, index) in addForm.domains" :label="'网盘地址' + (index+1)" :key="domain.key" :prop="'domains.' + index + '.value'">
        <el-input v-model="domain.videoUrl" placeholder="请输入磁力地址">
          <template slot="prepend">Http://</template>
          <el-button slot="append" @click.prevent="removeDomain(domain)">删除</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="addDomain">新增地址</el-button>
        <el-button size="small" @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
      <el-form-item label="上映日期">
        <el-date-picker type="date" placeholder="请选择日期" v-model="addForm.times"></el-date-picker>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" placeholder="请输入电影简介" v-model="addForm.addr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="addFormVisible = false">取消</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </el-dialog>
</section>
</template>

<script>
import axios from 'axios';
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import {
  getUserListPage,
  formmodel,
  romveList,
  getNewmovies,
  getMoviesMessage,
  addImages,
  statusTopImages,
  updateResources
} from '../../api/api';

export default {
  data() {
    return {
      filters: {
        title: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      //更新资源界面
      editResourcesVisible: false,
      resourcesLoading: false,
      editResourcesRules: {
        videoUrl: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }],
      },
      ResourcesForm: {
        id: "",
        videoUrl: '',
        videoUrlPass: ''
      },
      //编辑界面数据
      editForm: {
        id: "",
        topImg: "",
        type: '1'
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      //新增界面数据
      //2017-10-10
      moviesOptions: [],
      loading: false,
      options: [{
        value: '悬疑',
        label: '悬疑'
      }, {
        value: '科幻',
        label: '科幻'
      }, {
        value: '武侠',
        label: '武侠'
      }, {
        value: '动作',
        label: '动作'
      }],
      addForm: {
        _id: '',
        title: '',
        profiles: [],
        average: '',
        imageUrl: '',
        videoUrl: '',
        videoUrlPass: '',
        domains: [{
          videoUrl: ''
        }],
        times: Date(),
        addr: '',
        data: Date()
      }
    }
  },
  methods: {
    //更新资源
    resourcesEdit(index, row) {
      this.editResourcesVisible = true;
      console.log(this.editResourcesVisible)
      this.ResourcesForm.id = row.id;
    },
    resourcesSubmit: function() {
      this.$refs.ResourcesForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.resourcesLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.ResourcesForm);
            updateResources(para).then((res) => {
              this.resourcesLoading = false;
              //NProgress.done();
              let {
                status,
                message
              } = res;
              if (status == 200) {
                this.$message({
                  message: message,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: message,
                  type: 'warning'
                });
              }
              this.$refs['ResourcesForm'].resetFields();
              this.editResourcesVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    test: function(index, row) {
      this.$confirm('此操作将置顶此资源, 确定置顶?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.topImg == null) {
          this.$message.error('请先添加轮播图片！！！');
          this.getUsers();
        } else {
          let para = {
            id: row.id,
            type: row.type == true ? "1" : row.type == false ? "0" : "未知"
          }
          statusTopImages(para).then((res) => {
            let {
              status
            } = res
            if (status == 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            } else {
              this.$message({
                type: 'warning',
                message: '修改失败!'
              });
            }
          })
        }
      }).catch(() => {
        this.getUsers();
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });

    },
    moviesMessClick() {
      getMoviesMessage({
        'id': this.addForm._id
      }).then((res) => {
        let {
          status,
          message,
          data
        } = res;
        if (status == 200) {
          this.addForm.profiles = data.data.genres;
          this.addForm.imageUrl = data.data.images.large;
          this.addForm.addr = data.data.summary;
          this.addForm.title = data.data.title;
          this.addForm.average = data.data.rating.average;
        }
      })
    },
    profilesClick(row, column) {
      if (row.profiles) {
        return JSON.parse(row.profiles);
      }
    },
    videoUrlPass() {
      this.$prompt('请输入网盘链接密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({
        value
      }) => {
        this.addForm.videoUrlPass = value;
        this.$message({
          type: 'success',
          duration: 5000,
          message: '网盘链接密码是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //电影信息搜索
    //2017-10-10
    clickMovies: function() {
      this.loading = true;
      getNewmovies().then((res) => {
        this.loading = false;
        this.moviesOptions = res.data.data.subjects;
      })
    },
    remoteMovies(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          getNewmovies({
            query: encodeURIComponent(query)
          }).then((res) => {
            this.moviesOptions = res.data.data.subjects;
          })
        }, 1000);
      } else {
        this.moviesOptions = [];
      }
    },
    //上传轮播图
    handleCarouselSuccess(res, file) {
      this.editForm.topImg = res.data.url;
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.addForm.imageUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    //新增地址
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.addForm.domains.indexOf(item)
      if (index !== -1) {
        this.addForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.addForm.domains.push({

      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        title: this.filters.title,
        page: this.page,
        rows: 10
      };
      this.listLoading = true;
      //NProgress.start();
      getUserListPage(para).then((res) => {
        this.total = res.data.total;
        this.users = res.data.data
        this.listLoading = false;
        var sta;
        for (var i = 0; i < this.users.length; i++) {
          sta = this.users[i];
          if (sta.type == 1) {
            sta.type = true
          } else {
            sta.type = false
          }
        }
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = {
          id: row.id
        };
        romveList(para).then((res) => {
          this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.getUsers();
        });
      }).catch(() => {
        this.$message({
          message: res.message,
          type: 'warning'
        });
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm.id = row.id
    },
    //显示新增界面
    handleAdd: function() {
      //2017-10-10
      this.clickMovies();
      this.addFormVisible = true;
      this.addForm = {
        _id: '',
        title: '',
        profiles: [],
        average: '',
        videoUrl: '',
        videoUrlPass: '',
        imageUrl: '',
        domains: [{
          videoUrl: ''
        }],
        times: Date(),
        addr: '',
        data: Date()
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            addImages(para).then((res) => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            para.times = (!para.times || para.times == '') ? '' : util.formatDate.format(new Date(para.times), 'yyyy-MM-dd');
            para.data = (!para.data || para.data == '') ? '' : util.formatDate.format(new Date(para.data), 'yyyy-MM-dd hh:mm:ss');
            formmodel(para).then((res) => {
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px #bfcbd9 dashed;
  border-radius: 5px;
}

.avatar-uploader-icon-01 {
  font-size: 28px;
  color: #8c939d;
  width: 375px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  border: 1px #bfcbd9 dashed;
  border-radius: 5px;
}

.avatar {
  /*width: 100%;*/
  height: 178px;
  display: block;
}

.editForm-topImg {
  width: 100%;
}
</style>
