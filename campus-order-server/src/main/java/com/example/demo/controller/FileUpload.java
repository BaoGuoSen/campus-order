package com.example.demo.controller;

import java.io.BufferedOutputStream;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.config.appConfig;

@RestController
@RequestMapping(value = "file")
@CrossOrigin(allowCredentials = "true")
public class FileUpload {

	@Autowired
	private appConfig config;

	// @ApiOperation("上传图片，多文件")
	@PostMapping("upload")
	@ResponseBody
	public List<String> upload(HttpServletRequest request1, MultipartHttpServletRequest request) throws IOException {
		String ctxPath = request1.getSession().getServletContext().getRealPath("/");
		System.out.println(1111 + ctxPath);
		List<String> result = new ArrayList<>();
		List<MultipartFile> files = request.getFiles("file");
		if (files.size() > 0) {
			for (MultipartFile multipartFile : files) {
//                System.out.println(multipartFile);
				result.add(handleFileUpload(multipartFile, request));
			}
		}
		return result;
	}

	/**
	 * @ 单一文件上传
	 * 
	 * @param file
	 * @param request
	 * @return
	 */
	@RequestMapping("upload2")
	@ResponseBody
	public String handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		if (!file.isEmpty()) {
			String saveFileName = getFileName(file);
//            System.out.println(saveFileName);
//            System.out.println(2222+file.getName());
//            System.out.println("test"+config.getUploadFolder());
			File saveFile = new File(config.getUploadFolder() + saveFileName);// http://127.0.0.1:8080/+name
//            System.out.println(saveFile.getAbsolutePath());
//            System.out.println("333"+saveFile);
			if (!saveFile.getParentFile().exists()) {
				saveFile.getParentFile().mkdirs();
			}
			try {
				BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(saveFile));
				out.write(file.getBytes());
				out.flush();
				out.close();
				return config.getPreviewPath() + saveFile.getName();// 这句话你都没有
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				return "上传失败,";
			} catch (IOException e) {
				e.printStackTrace();
				return "上传失败,";
			}
		} else {
			return "上传失败，因为文件为空.";
		}
	}

	private String getFileName(MultipartFile file) {
		String name = file.getOriginalFilename();
		System.out.println(999 + name);
		StringBuilder sb = new StringBuilder();
		Date date = new Date();
		sb.append(date.getTime());
		sb.append(name.substring(name.indexOf(".")));
		return sb.toString();
	}

}
