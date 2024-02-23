<!-- uniapp vue3 markdown解析 -->
<template>
	<view class="ua__markdown">
		<u-parse :content="parseNodes(source)" :tag-style="styles">
			
		</u-parse> 
		<!-- space="nbsp" :nodes="parseNodes(source)" @itemclick="handleItemClick"> -->
			
		<!-- </rich-text> -->
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
	import MarkdownIt from './lib/markdown-it.min.js'
import hljs from './lib/highlight/uni-highlight.min.js'
import './lib/highlight/atom-one-dark.css'
import parseHtml from './lib/html-parser.js'
	const props = defineProps({
		// 解析内容
	source: String,
	  showLine: { type: [Boolean, String], default: true }
	})
	
	let copyCodeData = []
 const markdown = MarkdownIt({
		 html: true,
	 highlight: function(str, lang) {
		let preCode = ""
		try {
		preCode = hljs.highlightAuto(str).value
		} catch (err) {
		preCode = markdown.utils.escapeHtml(str);
			}
		const lines = preCode.split(/\n/).slice(0, -1)
		// 添加自定义行号
	let html = lines.map((item, index) => {
		if( item == ''){
			return ''
			}
				return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item +'</li>'
			}).join('')
		if(props.showLine) {
			html = '<ol style="padding: 0px 30px;">' + html + '</ol>'
			}else {
		html = '<ol style="padding: 0px 7px;list-style:none;">' + html + '</ol>'
			}
	copyCodeData.push(str)
		let htmlCode = `<div class="markdown-wrap">`
				// #ifndef MP-WEIXIN
			htmlCode += `<div style="color: #aaa;text-align: right;font-size: 12px;padding:8px;">`
					htmlCode += `${lang}<a class="copy-btn" code-data-index="${copyCodeData.length - 1}" style="margin-left: 8px;">复制代码</a>`
					htmlCode += `</div>`
				// #endif
		htmlCode += `<pre class="hljs" style="padding:10px 8px 0;margin-bottom:5px;overflow: auto;display: block;border-radius: 5px;"><code>${html}</code></pre>`;
			htmlCode += '</div>'
	return htmlCode
	}
	})
const parseNodes = (value) => {
	 if(!value) return
		 // 解析<br />到\n
	  value = value.replace(/<br>|<br\/>|<br \/>/g, "\n")
	value = value.replace(/&nbsp;/g, " ")
		 let htmlString = ''
	if (value.split("```").length % 2) {
		let mdtext = value
		if(mdtext[mdtext.length-1] != '\n'){
		mdtext += '\n'
			}
	  htmlString = markdown.render(mdtext)
		} else {
		htmlString = markdown.render(value)
		}
		// 解决小程序表格边框型失效问题
htmlString = htmlString.replace(/<table/g, `<table class="table"`)
		htmlString = htmlString.replace(/<tr/g, `<tr class="tr"`)
	htmlString = htmlString.replace(/<th>/g, `<th class="th">`)
htmlString = htmlString.replace(/<td/g, `<td class="td"`)
	htmlString = htmlString.replace(/<hr>|<hr\/>|<hr \/>/g, `<hr class="hr">`)

		// #ifndef APP-NVUE
		return htmlString
		// #endif
		
		// 将htmlString转成htmlArray，反之使用rich-text解析
		// #ifdef APP-NVUE
	return parseHtml(htmlString)
		// #endif
	}
	
// 复制代码
const handleItemClick = (e) => {
	let {attrs} = e.detail.node
let {"code-data-index":codeDataIndex,"class":className} = attrs
	if(className == 'copy-btn'){
	uni.setClipboardData({
		data: copyCodeData[codeDataIndex],showToast: false,
		success() {
			uni.showToast({
				title: '复制成功',icon: 'none'
				});
				}
			})
		}
	}
	const styles = {
		img: "border-radius: 10rpx;",
		h1: "font-family: inherit;  font-weight: 500; line-height: 1.1; color: inherit; margin-top: 20px; margin-bottom: 10px; font-size: 36px",		
		h2: "font-family: inherit;  font-weight: 500; line-height: 1.1; color: inherit; margin-top: 20px; margin-bottom: 10px; font-size: 30px",		
		h3: "font-family: inherit;  font-weight: 500; line-height: 1.1; color: inherit; margin-top: 20px; margin-bottom: 10px; font-size: 24px",
		h4: "font-family: inherit;  font-weight: 500; line-height: 1.1; color: inherit; margin-top: 10px; margin-bottom: 10px; font-size: 18px",
		h5: "font-family: inherit;  font-weight: 500; line-height: 1.1; color: inherit; margin-top: 10px; margin-bottom: 10px; font-size: 14px",		
		h6: "font-family: inherit;  font-weight: 500; line-height: 1.1; color: inherit; margin-top: 10px; margin-bottom: 10px; font-size: 12px",
		a: "background-color: transparent; color: #2196f3; text-decoration: none;",
		hr: "margin-top: 20px; margin-bottom: 20px; border: 0;border-top: 1px solid #e5e5e5;",
		img: "max-width: 89%; display: flex; margin-left:auto; margin-right:auto; border-radius: 20rpx; padding-top: 6rpx;",
		p: "margin: 0 0 8rpx;text-indent: 2em;font-family: 'Inter';font-style: normal;font-weight: 400;font-size: 14px;line-height: 17px;color: #333333;",
		em: "font-style: italic; font-weight: inherit;",
		ol: "margin-top: 0; margin-bottom: 10px; padding-left: 40px;",
		ul: "margin-top: 0; margin-bottom: 10px; padding-left: 40px;",
		dl: "margin-top: 0; margin-bottom: 20px;",
		dt: "font-weight: 600; line-height: 1.4;",
		dd: "line-height: 1.4;",
		pre: 'position: relativ; z-index: 11; font-family: Menlo, Monaco, Consolas, "Courier New", monospace;',
		code: 'font-family: Menlo, Monaco, Consolas, "Courier New", monospace;',
		kbd: 'font-family: Menlo, Monaco, Consolas, "Courier New", monospace;',
		samp: 'font-family: Menlo, Monaco, Consolas, "Courier New", monospace;',
		table: "border-spacing: 0; border-collapse: collapse; width: 100%; max-width: 65em;overflow: auto;margin-top: 0;margin-bottom: 16px;border-top: 1px solid #e5e5e5;border: 1px solid #e5e5e5;padding: 6px 13px;font-weight: 600;background-color: #eee;",
		tr: "border-top: 1px solid #e5e5e5;",
		th: "border: 1px solid #e5e5e5;padding: 6px 13px;font-weight: 600;background-color: #eee;",
		td: "border: 1px solid #e5e5e5;padding: 6px 13px;",
		
	}
</script>

<style lang="scss" scoped>
.ua__markdown {
	font-size: 14px;
	line-height: 1.5;
	word-break: break-all;
}
</style>
