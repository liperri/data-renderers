import { DataRendererSkeletonProps } from './types';

const DataRendererSkeleton = ({ renderData }: DataRendererSkeletonProps) => <>{renderData.skeleton}</>;

DataRendererSkeleton.displayName = 'DataRendererSkeleton';

export default DataRendererSkeleton;
