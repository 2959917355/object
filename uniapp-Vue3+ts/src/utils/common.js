import dayjs from "dayjs";

//页面间跳转
export function routerTo(url, type = "navigateTo") {
	if (type == "navigateTo") {
		uni.navigateTo({
			url,
			fail: err => {
				console.log(err);
				routerTo(url, "reLaunch")
			}
		})
	} else if (type == "reLaunch") {
		uni.reLaunch({
			url
		})
	} else if (type == "redirectTo") {
		uni.redirectTo({
			url,
			fail: err => {
				console.log(err);
				routerTo(url, "reLaunch")
			}
		})
	}
}

/**
 * 轻提醒
 * @param {String | Object} options
 * @param {String} options.title
 */
export function showToast(options = '') {
	if (typeof options === 'string') options = { title: options }

	const { title = "", duration = 2500, icon = "none", mask = false } = options

	return uni.showToast({
		title,
		icon,
		mask,
		duration,
		...options
	})
}


//返回上一页
export function goBack(delta = 1) {
	uni.navigateBack({
		delta
	});
}

/**
 * 显示loading加载
 * @param {String | Object} options
 * @param {String} options.title
 */
export function showLoading(options = '') {
	if (typeof options === 'string') options = { title: options }
	const { title = "", mask = false } = options
	return uni.showLoading({
		title,
		mask,
		...options
	})
}

/**
 * 显示模态弹窗
 * @param options
 * @param {String} options.title
 * @param {String} options.content
 */
export function showModal(options = {}) {

	const {
		title = "提示",
		content = "",
		confirmText = '确认',
		cancelText = '取消',
		showCancel = true,
	} = options

	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			content,
			confirmText,
			cancelText,
			showCancel,
			success: (res) => {
				resolve(res.confirm)
			},
			fail: (err) => {
				reject(err)
			},
			...options
		})
	})

}

//图片压缩转webp格式
function compressAndConvertToWebP(blob, quality = 0.8) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = blob;

		img.onload = () => {
			// 创建一个canvas元素
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);

			// 使用canvas的toBlob方法将图像转换为WebP格式
			canvas.toBlob((webpBlob) => {
				const webpBlobUrl = URL.createObjectURL(webpBlob);
				resolve(webpBlobUrl);
			}, 'image/webp', quality);
		};

		img.onerror = (error) => {
			reject(error);
		};
	});
}




//上传单张图片
export const uploadFileItem = async (url, rootPath = 'admin') => {
	let tempurl = await compressAndConvertToWebP(url);
	return await uniCloud.uploadFile({
		filePath: tempurl,
		cloudPath: rootPath + "/" + dayjs().format("YYYYMMDD") + "/" + Date.now() + ".webp",
		cloudPathAsRealPath: true
	})
}