import { DefaultTheme } from 'vitepress';

export interface SidebarItemExtend extends DefaultTheme.SidebarItem {
  /**
   * 自动生成子菜单
   *
   * 注意：将覆盖原有子菜单
   */
  autoGenerate?: {
    /**
     * glob 路径，支持多个 cwd 为 docs
     */
    glob: string | string[];

    ignore?: string[];

    /**
     * 是否多级菜单（未实现）
     *
     * 注意：多级菜单下，`autoGenerate` 仅支持单个 glob 路径
     */
    multistage?: boolean;
  };
}
