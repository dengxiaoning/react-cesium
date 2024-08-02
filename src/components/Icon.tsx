import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import * as AllIcons from "@ant-design/icons";
import { createFromIconfontCN } from '@ant-design/icons';
// refrence https://blogweb.cn/article/3898594854203
type PickProps<T> = T extends (props: infer P1) => any
  ? P1
  : T extends React.ComponentClass<infer P2>
  ? P2
  : unknown;

type AllKeys = keyof typeof AllIcons;
//  获取大写开头的导出们, 认为是组件
type PickCapitalizeAsComp<K extends AllKeys> = K extends Capitalize<K>
  ? K
  : never;
// ------------------------------------------------^ typescript 4.1+ --------
type IconNames = PickCapitalizeAsComp<AllKeys>;
// 没有 4.1 的可以手动排除 小写开头的方法们
// type IconNames = Exclude<
//   AllKeys,
//   "createFromIconfontCN" | "default" | "getTwoToneColor" | "setTwoToneColor"
// >;

export type PickIconPropsOf<K extends IconNames> = PickProps<
  typeof AllIcons[K]
>;


const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4641784_o3jmbyfnqc.js',
    'static/font/iconfont.js'
  ],
});

// 这里将不再能用 FC 来包裹, 原因的话 也可以再开一篇来讲了
const Icon = <T extends IconNames, P extends Object = PickIconPropsOf<T>>({
  name,
  ...props
}: { name: T } & Omit<P, "name">) => {
  // const [Comp, setComp] = useState<React.ClassType<any, any, any>>(
  //   LoadingOutlined
  // );
  // useEffect(() => {
  //   import(`@ant-design/icons/${name}.js`).then((mod) => {
  //     setComp(mod.default);
  //   });
  //   setComp(name);
  // }, [name]);
  // return <Comp {...props} />;
  return <IconFont type={name}  {...props} />;
};

export default Icon;
