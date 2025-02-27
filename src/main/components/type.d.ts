/**
 * 场景类型
 * hydrogenVehicle: 乘坐氢能交通工具
 * gasElectricity: 走发电步道发电
 * water: 喝海露纯净水
 * bike: 体验零碳单车
 * zeroCarbonHouse: 零碳小屋
 */
export type SecneType = 'hydrogenVehicle' | 'gasElectricity' | 'water' | 'bike' | 'zeroCarbonHouse'



export interface IPropsType {
    userName: string;
    points: number;
    rank: number;
    avatar: string;
    key: string;
  }