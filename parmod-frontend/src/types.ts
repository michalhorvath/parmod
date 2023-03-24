export interface Error {
  error: string
}

export enum UserRole {
  USER = 'user',
  DESIGNER = 'designer',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}

export interface User {
  id: string,
  username: string,
  role: UserRole,
  name: string,
  email: string
}

export interface UserFormValues extends Omit<User, 'id'> {
  password: string;
}

export type LoggedUser = User | null;

export interface Parameter {
  id: string,
  name: string,
  variable: string,
  type: string,
  defaultValue: string,
}

export type ParameterFormValues = Omit<Parameter, 'id'>;


export interface DesignPreview {
  id: string,
  title: string
}

export interface Design extends DesignPreview {
  description: string,
  code: string,
  author: string,
  parameters: Parameter[]
}

export interface DesignFormValues extends Omit<Design, 'id' | 'parameters' | 'author'> {
  parameters: ParameterFormValues[];
}

export interface ParameterValue {
  id: string,
  name: string,
  value: string,
}

export type ParameterValueFormValues = Omit<ParameterValue, 'id'>;

export interface Model {
  id: string,
  design: string,
  user: string,
  parameterValues: ParameterValue[]
}

export interface ModelFormValues extends Omit<Model, 'id' | 'parameterValues'> {
  parameterValues: ParameterValueFormValues[];
}
