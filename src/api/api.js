import axios from "axios";
export default {
  // 获取模板页面的数据
  getData: (params) => {
    return axios.get(`https://tanzhiw.com/api/video/videodata/`, { params: params });
  },
  
  // 获取模板旁白的数据
  getVideoData: (params) => {
    return axios.get(`https://tanzhiw.com/api/video/voicemake/`, { params: params })
  },
  // 录屏服务开始
  recordStart: (domain, params) => {
    return axios.get(`${domain}/api/ffmpeg/recordstart/`, { params: params });
  },
  recordStop: (domain, params) => {
    return axios.get(`${domain}/api/ffmpeg/recordstop/`, { params: params });
  },
  //释放录屏进程
  recordRelease: (domain, params) => {
    return axios.get(`${domain}/api/ffmpeg/recordrelease/`, { params: params });
  },

  releasePcPort: (params) => {
    return axios.get(`https://tanzhiw.com/api/video/releasepcport/`, { params: params })
  },

  combineAudiosWithBgm: (domain, ip, port, data) => {
    return axios.post(`${domain}/api/ffmpeg/combineaudioswithbgm/?ip=${ip}&port=${port}`, data)
  },
};
