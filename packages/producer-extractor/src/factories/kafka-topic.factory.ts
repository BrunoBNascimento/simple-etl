export interface KafkaTopicDTO<T> {
  system: string;
  tenant: string;
  data: T;
}

export function createKafkaTopicObject<T>(
  obj: T,
  system: string,
  tenant: string,
): KafkaTopicDTO<T> {
  return {
    system,
    tenant,
    data: obj,
  };
}
