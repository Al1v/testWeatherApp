import { DataTypes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'weather_api_data', timestamps: false })
export class WeatherApiData extends Model<WeatherApiData> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataTypes.ARRAY(DataTypes.STRING) })
  part: string[];

  @Column({ type: DataTypes.JSONB })
  data: Object;

  @Column({ type: DataTypes.FLOAT })
  lat: Number;

  @Column({ type: DataTypes.FLOAT })
  lon: Number;
}
