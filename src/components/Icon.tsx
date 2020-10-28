import React from 'react';
type Props = {
  id: string
} & React.SVGAttributes<SVGElement>

const Icon:React.FC<Props> = (props) => {
  const importAll = (requireContent: __WebpackModuleApi.RequireContext) => requireContent.keys().forEach(requireContent);
  try {
    importAll(require.context('../assets/icons', true, /\.svg$/));
  } catch (e) {
    console.log(e);
  }
  // 导入所有icons文件夹中的svg
  const {id,children,className,...rest} = props
  return (
    <>
      <svg  className={'icon'} {...rest} >
        <use xlinkHref={id}/>
      </svg>
    </>
  )
}

export {Icon}