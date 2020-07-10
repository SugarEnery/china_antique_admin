<template>
    <div>
        <el-tree :data="treeData" :props="defaultProps" node-key="id" :expand-on-click-node="false" @node-click="nodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{node.label}}
                    <i class="el-icon-plus" @click.stop="() => add(data)"></i>
                    <i class="el-icon-edit-outline" @click.stop="() => edit(data)"></i>
                    <i class="el-icon-delete" @click.stop="() => remove(node,data)"></i>
                </span>
            </span>
        </el-tree>
    </div>
</template>
<script>
let id = 1000;

export default {
    name: "treepage",
    data() {
        return {
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        add(data) {
            const newChild = { id: id++, label: '新增节点' + id, children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);

        },
        edit(data) {
            data.label = "修改节点";
            console.log(data);
        },
        remove(node, data) {
            debugger;
            const parent = node.parent
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            this.$message({
                type: 'success',
                message: 'delete ok'
            })

        },
        nodeClick(data, node, el) {
            this.$message({
                message: '您点击的是:' + data.label,
                type: "success"
            });
        }

    }
};
</script>
