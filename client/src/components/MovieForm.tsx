import { Button, Checkbox, Form, FormInstance, Input, message, Switch } from "antd"
import React from "react"
import ImgUploader from "./ImgUploader";
import { InputNumber } from "antd";
import { IMovie } from "../services/MovieService";
const AllAreas: { label: string, value: string }[] = [
    { label: "中国", value: "中国" },
    { label: "美国", value: "美国" },
    { label: "日本", value: "日本" },
    { label: "韩国", value: "韩国" },
]

const AllTypes: { label: string, value: string }[] = [
    { label: "动作", value: "动作" },
    { label: "喜剧", value: "喜剧" },
    { label: "爱情", value: "爱情" },
    { label: "科幻", value: "科幻" },
]

interface IFormProp {
    onSubmit: (movie: IMovie) => Promise<string>
    movie?: IMovie
}
class MovieForm extends React.Component<IFormProp> {
    formRef = React.createRef<FormInstance>()

    onFinish = async (values: any) => {
        console.log(this.props);
        const result = await this.props.onSubmit(values);
        if (result) {
            message.error(result)
        }
        else {
            message.success("处理成功")
        }
    };

    componentDidUpdate(): void {
        this.formRef.current?.setFieldsValue(this.props.movie)
    }

    render() {
        return (
            <Form
                style={{ maxWidth: 400 }}
                ref={this.formRef}
                onFinish={this.onFinish}
            >
                <Form.Item label="电影名称" name="name" rules={[{ required: true, message: '请输入电影名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="封面" name="poster">
                    <ImgUploader />
                </Form.Item>
                <Form.Item label="地区" name="areas" rules={[{ required: true, message: '请选择地区' }]}>
                    <Checkbox.Group options={AllAreas} />
                </Form.Item>
                <Form.Item label="类型" name="types" rules={[{ required: true, message: '请选择类型' }]}>
                    <Checkbox.Group options={AllTypes} />
                </Form.Item>
                <Form.Item label="时长" name="timeLong" rules={[{ required: true, message: '请填写时长' }]}>
                    <InputNumber min={1} max={1000} step={1} />
                </Form.Item>
                <Form.Item label="正在热映" name="isHot" initialValue={false}>
                    <Switch />
                </Form.Item>
                <Form.Item label="正在上映" name="isComing" initialValue={false}>
                    <Switch />
                </Form.Item>
                <Form.Item label="经典影片" name="isClassic" initialValue={false}>
                    <Switch />
                </Form.Item>
                <Form.Item label="描述" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form >
        )
    }
}

export default MovieForm