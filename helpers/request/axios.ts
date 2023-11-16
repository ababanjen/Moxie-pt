import axios from "axios";

type AxiosTypes = {
  method: string;
  url?: string;
  data?: any;
  params?: any;
  customURL?: string
};
const axiosRequest = ({ method = "GET", customURL, url, ...restProps }: AxiosTypes) =>
  axios({
    method,
    // url,
    url: customURL ?? `${process.env.BASE_URL}${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    ...restProps,
  })
    .then(res => res.data)
    .catch(err => err);

export default axiosRequest;
