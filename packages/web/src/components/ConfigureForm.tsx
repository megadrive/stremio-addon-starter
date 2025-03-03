import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfigSchema, type Config, config } from "@stremio-addon/config";
import { useState } from "react";

export default function ConfigureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Config>({
    resolver: zodResolver(ConfigSchema),
    defaultValues: {
      variable1: "",
    },
  });

  const [configString, setConfigString] = useState<string>();

  const onSubmit = handleSubmit((data) => {
    const encodedConfig = config.encode(data);
    console.log({ data, encodedConfig });

    setConfigString(encodedConfig);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="variable1">Variable 1</label>
          <span className="text-red-500">{errors.variable1?.message}</span>
          <input type="text" {...register("variable1")} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
      <div className={`${configString ? "" : "hidden"} flex flex-col gap-2`}>
        <a
          href={`/${configString}/manifest.json`.replace(/^https?/i, "stremio")}
        >
          Install
        </a>
        <a
          href={`https://web.stremio.com/#/addons?addon=${configString}/manifest.json`}
        ></a>
        <a
          href="#"
          onClick={() => navigator.clipboard.writeText(configString ?? "")}
        >
          Copy
        </a>
      </div>
    </form>
  );
}
