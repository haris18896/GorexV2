import {FC} from 'react';
import axiosInstance from '../axiosInstance';

interface PostApiProps {
  endpoint?: any;
  body?: any;
}

type GetApiProps = {
  endpoint?: any;
  body?: any;
};

const Post: FC<PostApiProps> = ({endpoint, body}) => {
  return axiosInstance.post(endpoint, body);
};

const Get: FC<GetApiProps> = ({endpoint, body}) => {
  return axiosInstance.get(endpoint, body);
};

export {Post, Get};
