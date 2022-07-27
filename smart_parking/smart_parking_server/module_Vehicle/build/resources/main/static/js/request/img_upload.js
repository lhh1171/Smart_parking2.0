
function uploadImg() {
    var vehicle = document.getElementById("vehicle").files[0];
    var registr = document.getElementById("regist").files[0];
    var driving = document.getElementById("driving").files[0];
    var reads = new FileReader();

    if (typeof (vehicle) == "undefined" || vehicle.size <= 0) {//判断有没有选择图片
        $.messager.alert('提示', "请选择图片");
        return;
    }
    if (typeof (registr) == "undefined" || registr.size <= 0) {//判断有没有选择图片
        $.messager.alert('提示', "请选择图片");
        return;
    }
    if (typeof (driving) == "undefined" || driving.size <= 0) {//判断有没有选择图片
        $.messager.alert('提示', "请选择图片");
        return;
    }
    var data = new FormData();
    // vFile.append("action", "UploadVMKImagePath");

    /**
     *  String user_name,
     String user_id,
     String license,
     MultipartFile vehicle,
     MultipartFile regist,
     MultipartFile driving
     */
    data.append("user_name", $("#user_name").val());//添加字段和对应的值
    data.append("user_id",$("#user_id").val());
    data.append("license",$("#license").val());
    data.append("vehicle",vehicle);
    data.append("regist",registr);
    data.append("driving",driving);
    console.log($("#user_name").val())
    console.log($("#user_id").val())
    console.log($("#license").val())

    $.ajax({
        url: "/Vehicle/Upload3",
        data: data,
        type: "Post",
        dataType: "json",
        headers: {//token验证没有不加
            token: sessionStorage.getItem("token"),
        },
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (result) {
            $.messager.alert('提示', "上传成功");
            if (result.responseText == "y") {
                //这里为你你成功后的回调,可以传成功后显示在本地
                reads.readAsDataURL(fileObj);//把文件对象读成base64，读完直接放到src中
                reads.onload = function (e) {
                    document.getElementById(id).src = this.result;
                }
                console.log("成功")
            }
            else
            console.log("失败")
        },
        error: function (result) {
            if (result.responseText == "y") {
                //这里为你你成功后的回调,可以传成功后显示在本地
                reads.readAsDataURL(fileObj);//把文件对象读成base64，读完直接放到src中
                reads.onload = function (e) {

                }
                console.log("成功")
            }
            else
            console.log("失败")

        }
    });
}
