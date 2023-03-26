import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import getBase64 from "../../hooks/getBase64";
import { Box } from "@mui/material";

export type UploadImageProps = {
  fileList: UploadFile[],
  fileListHandler: (arg: any) => void
}

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const {
    fileList = [],
    fileListHandler
  } = props

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );

  useEffect(() => {
    console.log('fileList', fileList)
  }, [fileList])

  return (
    <>
      <Upload
        // customRequest={uploadPicture}
        onPreview={handlePreview}
        onChange={fileListHandler}
        accept="image/png, image/jpeg, image/jpg"
        listType="picture-card"
        maxCount={10}
        multiple={true}
        fileList={fileList}
        beforeUpload={(file: any) => {
          fileListHandler([...fileList, file]);
          return false;
        }}
        onRemove={(file: any) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          fileListHandler(newFileList);
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Box
        sx={{
          zIndex: '2000'
        }}
      >
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Box>
    </>
  );
};

export default UploadImage;
