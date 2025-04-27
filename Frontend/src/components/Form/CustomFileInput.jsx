var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, Image, notification, Upload } from 'antd';
import { backend_url } from '../../config/app';
import Cookies from 'js-cookie'
import { updateUserbuidingImage } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const CustomFileInput = ({request_path = '', url = '', name='image'}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: name,
            status: 'done',
            url: url,
        }
    ]);

    const dispatch = useDispatch();

    const [api, NotificationHolder] = notification.useNotification();
    
      const openNotification = (message, description, type = 'info') => {
          api.open({
              type: type,
              message: message,
              description: <p>{description}</p>,
              placement: 'bottomRight',
              duration: 5,
              showProgress: true,
              pauseOnHover: true,
          });
      };

    // Event Handlers

    const handlePreview = file =>
        __awaiter(void 0, void 0, void 0, function* () {
        if (!file.url && !file.preview) {
            file.preview = yield getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        });

    const handleChange = ({ fileList: newFileList, file }) => {
      setFileList(newFileList)
      if (file.status === 'done') {
        openNotification('Success!', 'Image Successfully Updated', 'success');
        dispatch(updateUserbuidingImage(file.response.path))
      }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            {NotificationHolder}
            <Upload
                action={`${backend_url}${request_path}`}
                method='POST'
                listType="picture-card"
                headers={{
                  'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }}
                name={name}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                style={{ width: '100%', maxWidth: '100%', minWidth: 600 }}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: visible => setPreviewOpen(visible),
                    afterOpenChange: visible => !visible && setPreviewImage(''),
                }}
                src={previewImage}
                />
            )}
        </>
    );
};

export default CustomFileInput;