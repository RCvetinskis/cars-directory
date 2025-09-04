import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  message,
  Space
} from 'antd';
import {
  CarOutlined,
  SaveOutlined,
  ClearOutlined
} from '@ant-design/icons';
import api from '../api';

const { Title } = Typography;

const PamirCarForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const carData = {
        name: values.name,
        model: values.model,
        year: values.year ? Number(values.year) : null,
        color: values.color || null,
        price: values.price != null ? Number(values.price) : null
      };

      await api.post('/cars', carData);

      message.success(`Car "${values.name} ${values.model}" created successfully!`);
      form.resetFields();
    } catch (error) {
      console.error('Error creating car:', error);
      message.error(error?.response?.data?.error || 'Failed to create car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('Form cleared');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CarOutlined style={{ marginRight: '12px', color: '#1890ff', fontSize: '32px' }} />
            Pamir Car Creation Form
          </Title>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Add a new car to your inventory
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Car Brand"
                rules={[
                  { required: true, message: 'Please enter car brand' },
                  { min: 2, message: 'Brand must be at least 2 characters' },
                  { max: 50, message: 'Brand must be less than 50 characters' }
                ]}
              >
                <Input placeholder="e.g., Toyota, BMW, Tesla" style={{ borderRadius: '6px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model"
                rules={[
                  { required: true, message: 'Please enter model' },
                  { min: 1, message: 'Model must be at least 1 character' },
                  { max: 50, message: 'Model must be less than 50 characters' }
                ]}
              >
                <Input placeholder="e.g., Camry, X5, Model S" style={{ borderRadius: '6px' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Year"
                rules={[
                  { required: true, message: 'Please enter year' },
                  {
                    validator: (_, value) => {
                      const currentYear = new Date().getFullYear();
                      if (value && (value < 1900 || value > currentYear + 1)) {
                        return Promise.reject(`Year must be between 1900 and ${currentYear + 1}`);
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder={`e.g., ${new Date().getFullYear()}`}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="Color"
                rules={[
                  { required: true, message: 'Please enter color' },
                  { min: 3, message: 'Color must be at least 3 characters' },
                  { max: 30, message: 'Color must be less than 30 characters' }
                ]}
              >
                <Input placeholder="e.g., Red, Blue, Silver" style={{ borderRadius: '6px' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="price"
            label="Price (USD)"
            rules={[
              { required: true, message: 'Please enter price' },
              {
                validator: (_, value) => {
                  if (value && (value <= 0 || value > 10000000)) {
                    return Promise.reject('Price must be between $1 and $10,000,000');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              type="number"
              placeholder="e.g., 25000"
              prefix="$"
              min="1"
              max="10000000"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginTop: '32px' }}>
            <Space size="large">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
                style={{
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a',
                  minWidth: '140px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
                }}
              >
                Create Car
              </Button>
              <Button
                type="default"
                onClick={handleReset}
                icon={<ClearOutlined />}
                size="large"
                style={{ minWidth: '120px', borderRadius: '6px' }}
              >
                Clear Form
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f6ffed',
          border: '1px solid #b7eb8f',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#52c41a', fontWeight: 'bold' }}>
            💡 Tip: Make sure to fill in all required fields before submitting
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PamirCarForm;
