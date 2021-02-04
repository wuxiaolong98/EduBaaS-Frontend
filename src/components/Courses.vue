<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Index</el-breadcrumb-item>
      <el-breadcrumb-item>Course Management</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header">
        <span>Course and content management</span>
      </div>
      <el-input placeholder="" v-model="quaryString" clearable>
        <el-button
          slot="append"
          @click="getCourseList"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <div>
        <p>List of registered courses</p>
        <!-- Use Table for packaging. -->
        <el-tree
          :data="courseList"
          node-key="id"
          draggable
          :expand-on-click-node="false"
          highlight-current
        >
          <span slot-scope="{ node, data }" class="tree-slot">
            <span>{{ node.data.name }}</span>
            <span class="tree-button">
              <el-button
                type="text"
                size="mini"
                @click="() => add(node, data)"
              >
                Add
              </el-button>
              <el-button
                type="text"
                size="mini"
              >
                Edit
              </el-button>
              <el-button
                type="text"
                size="mini"
              >
                Remove
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <!-- Pagination. -->
      <el-row type="flex" justify="space-around">
        <el-col :span="24">
          <el-pagination
            @size-change="tableSizeChange"
            @current-change="tablePageChange"
            :current-page="pageNumber"
            :page-sizes="[5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="courseTotalNumber"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  // Initialize to get data.
  created: function() {
    this.getCourseList();
  },
  data: function() {
    return {
      courseList: [],
      // Number of root nodes of the tree. / Number of courses.
      courseTotalNumber: null,
      // The total number of nodes in the tree, including branch nodes and leaf nodes. / Number of courses.
      coureswareTotalNumber: 0,
      // Search by Course name.
      quaryString: null,
      pageNumber: 1,
      pageSize: 5
    };
  },
  methods: {
    getCourseList: function() {
      this.$http
        .get("/course/list", {
          quaryString: this.quaryString,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          // People with different identities can get different course lists, the list is associated with identity.
          // For example, the administrator can get all the lists, but the teacher can only get the lists related to them.
          token: window.sessionStorage.getItem("token")
        })
        .then(response => {
          console.log(response);
          this.courseList = response.data.courseList;
          this.courseTotalNumber = response.data.courseTotalNumber;
          this.coureswareTotalNumber = response.data.coursewareTotalNumber;
        })
        .catch(error => {
          console.log(error);
        });
    },
    add: function(node, data) {
      let newNode = {
        id: this.coureswareTotalNumber++,
        name: "New Node",
        children: []
      };
      // Determine whether the node has child nodes.
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newNode);
      // Tell the background to add Node.
      this.$http
        .post("/course/addCourseware", {
          name: newNode.name,
          parent_id: node.key
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // edit: function(node, data) {

    // },
    // remove: function(node, data) {

    // },
    tablePageChange: function(number) {
      this.pageNumber = number;
    },
    tableSizeChange: function(size) {
      this.pageSize = size;
    }
  },
  name: "Courses"
};
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}

.el-tree {
  margin-bottom: 15px;
}

.tree-slot {
  width: 100%;
}

.tree-button {
  float: right;
}
</style>
