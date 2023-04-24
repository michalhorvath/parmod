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
  email: string,
  profilePhoto?: Image
}

export interface UserFormValues extends Omit<User, 'id' | 'profilePhoto'> {
  password: string;
  profilePhoto?: string
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

export interface Like {
  id: string,
  user: string,
}

export interface Comment {
  id: string,
  user: string,
  text: string;
}

export type CommentFormValues = Omit<Comment, 'id' | 'user'>;


export interface DesignPreview {
  id: string,
  title: string
}

export interface Design extends DesignPreview {
  description: string,
  code: string,
  author: User,
  parameters: Parameter[],
  comments: Comment[],
  likes: Like[]
}

export interface DesignFormValues extends Omit<Design, 
  'id' | 'parameters' | 'author' | 'comments' | 'likes'> {
  parameters: ParameterFormValues[];
}

export interface ParameterValue {
  id: string,
  name: string,
  value: string,
}

export type ParameterValueFormValues = Omit<ParameterValue, 'id'>;

export enum ModelFileStatus {
  RENDERING = 'rendering',
  OK = 'ok',
  FAILED = 'failed'
}

export interface Model {
  id: string,
  design: string,
  user: string,
  parameterValues: ParameterValue[],
  modelFile: {
    id: string,
    status: ModelFileStatus,
    data: {
      data: number[],
      type: 'Buffer'
    },
    contentType: 'model/stl'
  }
}

export interface ModelFormValues {
  design: string,
  parameterValues: ParameterValueFormValues[];
}

export interface FeedModel {
  id: string,
  design: string,
  user: string,
  type: 'model';
}

export interface FeedDesign {
  id: string,
  author: string,
  title: string,
  type: 'design';
}

export type Feed = FeedModel | FeedDesign;

export interface Image{
  id: string,
  data: {data: number[]},
  contentType: string
}


