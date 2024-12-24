# 合并音视频

[ffmpeg](https://ffmpeg.org/)

```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -strict experimental output.mp4
```

命令参数简介：

- -i video.mp4：指定视频文件路径。
- -i audio.mp3：指定音频文件路径。
- -c:v copy：将视频流复制到输出文件中，不进行重新编码。
- -c:a aac：使用AAC编码音频流。
- -strict experimental：启用实验性AAC编码器。
- output.mp4：指定输出文件路径和名称。
  
注意：如果音频和视频长度不同，输出文件可能会被剪裁或缩短，以匹配较短的文件的长度。如果需要确保音频和视频长度匹配，请在合并之前对它们进行处理。