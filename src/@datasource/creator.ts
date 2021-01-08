import elementTemplateBase from './ext.element.temp.json';

const getElementTemplateBase = () => elementTemplateBase;

interface IfElementExtension {
  id: string
  name: string
  createTime: string
  updateTime: string
  extensionType: string
  extension: string
  version: string
  layout: any
  resource: any
}

export const createElementExtension = (extension: any):IfElementExtension => {
  let result:any = getElementTemplateBase();
  result.resource = extension.template();

  result.id = Date.now().toString();
  result.name = extension.name;
  result.version = extension.version;
  result.extension = extension.id;

  let createTime = (new Date()).toUTCString();
  result.createTime = createTime;
  result.updateTime = createTime;

  return result;
}
